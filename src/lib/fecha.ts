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
