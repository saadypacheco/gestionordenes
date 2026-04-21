import { env } from '@/config/env';
import { HTTP_RETRY_INTENTOS, HTTP_TIMEOUT_MS } from '@/config/constants';
import { ApiError, isRetryable } from '@/domain/errores';

/**
 * Wrapper sobre `fetch` con:
 *  - Timeout via AbortController
 *  - Retry con backoff para fallas de red y 5xx (4xx se propaga sin reintentar)
 *  - Errores tipados (`ApiError`)
 *  - Base URL configurable por entorno via `env.apiUrl`
 *
 * Consumidores: `src/api/{auth,ordenes,listas,imagenes}.ts`.
 * Ver AGENTS.md §5 y docs/backend-endpoints.md.
 */

type RequestInitExt = RequestInit & {
  /** Override del timeout por request (ms). Default: HTTP_TIMEOUT_MS. */
  timeoutMs?: number;
  /** Path absoluto (no debe incluir el host). Puede contener comillas literales. */
};

async function doRequest(path: string, init: RequestInitExt = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutMs = init.timeoutMs ?? HTTP_TIMEOUT_MS;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Base URL tiene que terminar sin slash, path empieza con slash.
  // El backend legacy acepta comillas dobles literales en el path — NO encodear.
  const base = env.apiUrl.replace(/\/+$/, '');
  const url = `${base}${path}`;

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      throw new ApiError('http', `HTTP ${res.status} on ${path}`, { status: res.status });
    }
    return res;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    // AbortError fired por nuestro AbortController = timeout real
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ApiError('timeout', `Timeout ${timeoutMs}ms on ${path}`, { cause: err });
    }
    // TypeError con "Network request failed" u otros = sin conectividad
    throw new ApiError('network', err instanceof Error ? err.message : 'Network error', { cause: err });
  } finally {
    clearTimeout(timer);
  }
}

async function withRetry<T>(fn: () => Promise<T>, intentos = HTTP_RETRY_INTENTOS): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= intentos; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (!isRetryable(err) || i === intentos) throw err;
      // backoff exponencial: 1s, 3s, 7s...
      const waitMs = 1000 * (2 ** i);
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
  throw lastError;
}

async function parseJson<T>(res: Response, path: string): Promise<T> {
  try {
    return (await res.json()) as T;
  } catch (err) {
    throw new ApiError('parse', `Invalid JSON from ${path}`, { cause: err });
  }
}

export async function apiGet<T>(path: string, init?: RequestInitExt): Promise<T> {
  const res = await withRetry(() => doRequest(path, { ...init, method: 'GET' }));
  return parseJson<T>(res, path);
}

export async function apiPost<T>(path: string, body: unknown, init?: RequestInitExt): Promise<T> {
  const res = await withRetry(() =>
    doRequest(path, {
      ...init,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      body: JSON.stringify(body),
    }),
  );
  return parseJson<T>(res, path);
}

/**
 * Upload multipart (para `/ordenes/guardarImagen`).
 * No serializamos body — se pasa un FormData listo. No aplicamos retry por default
 * porque subir un archivo varias veces duplicaría si el backend ya lo recibió.
 */
export async function apiPostMultipart<T>(
  path: string,
  form: FormData,
  init?: RequestInitExt,
): Promise<T> {
  const res = await doRequest(path, {
    ...init,
    method: 'POST',
    body: form,
    // NO seteamos Content-Type: fetch agrega el boundary automáticamente
  });
  return parseJson<T>(res, path);
}
