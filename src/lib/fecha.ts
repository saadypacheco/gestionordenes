/**
 * Utilidades de fecha. El legacy y el backend manejan fechas como strings
 * "YYYY-MM-DD" o "YYYY-MM-DDTHH:mm:ss" — las trabajamos en string sin Date
 * para evitar problemas de zona horaria.
 */

/** Devuelve la fecha de hoy en formato YYYY-MM-DD (zona local). */
export function fechaHoyStr(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** Compara dos strings YYYY-MM-DD. null-safe. */
export function mismaFecha(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  return a.substring(0, 10) === b.substring(0, 10);
}

/**
 * Formato humano DD/MM/YYYY para display.
 * Acepta `YYYY-MM-DD`, `YYYY-MM-DDTHH:mm:ss` o null. Si el string no matchea,
 * lo devuelve tal cual.
 */
export function fechaDisplay(s: string | null | undefined): string {
  if (!s) return '—';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (!m) return s;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

/**
 * Formato humano DD/MM/YYYY HH:mm para timestamps ISO.
 * Acepta `YYYY-MM-DDTHH:mm:ss...` o null. No interpreta zona: se asume que el
 * string ya está en la zona que queremos mostrar.
 */
export function fechaHoraDisplay(s: string | null | undefined): string {
  if (!s) return '—';
  const m = /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/.exec(s);
  if (!m) return s;
  return `${m[3]}/${m[2]}/${m[1]} ${m[4]}:${m[5]}`;
}
