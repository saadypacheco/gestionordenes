/**
 * Errores tipados que emite el cliente HTTP. Se mapean en la UI a mensajes
 * amigables y a decisiones de sync (retry vs. descartar).
 */

export type ApiErrorKind =
  | 'network'   // sin red, host unreachable, DNS, etc.
  | 'timeout'   // se cumplió el timeout del fetch
  | 'http'      // respuesta HTTP no-2xx
  | 'parse';    // el body vino malformado o no matchea el shape esperado

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly cause?: unknown;

  constructor(kind: ApiErrorKind, message: string, opts?: { status?: number; cause?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = opts?.status;
    this.cause = opts?.cause;
  }
}

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

export const isRetryable = (e: unknown): boolean => {
  if (!isApiError(e)) return false;
  if (e.kind === 'network' || e.kind === 'timeout') return true;
  if (e.kind === 'http' && e.status !== undefined && e.status >= 500) return true;
  return false;
};
