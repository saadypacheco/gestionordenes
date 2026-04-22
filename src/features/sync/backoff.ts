/**
 * Lógica de backoff para reintentos del syncWorker.
 * Puro, testeable sin DB.
 *
 * Estrategia: exponencial con base 30s.
 *   intentos=0 → ready siempre (primer intento)
 *   intentos=1 → ready 30s después del último fallo
 *   intentos=2 → 1m
 *   intentos=3 → 2m
 *   intentos=4 → 4m
 *   intentos=5+ → cap 10m (evita esperas eternas; el usuario puede forzar)
 */

const BASE_MS = 30_000;
const CAP_MS = 10 * 60_000;

export function proximoReintentoEn(intentos: number): number {
  if (intentos <= 0) return 0;
  const ms = BASE_MS * 2 ** (intentos - 1);
  return Math.min(ms, CAP_MS);
}

/**
 * Decide si un item de la cola puede procesarse ahora.
 */
export function estaListo(
  intentos: number,
  lastAttemptAt: string | null,
  ahora: Date = new Date(),
): boolean {
  if (intentos === 0 || !lastAttemptAt) return true;
  const ultimo = new Date(lastAttemptAt).getTime();
  if (Number.isNaN(ultimo)) return true;
  const elapsed = ahora.getTime() - ultimo;
  return elapsed >= proximoReintentoEn(intentos);
}
