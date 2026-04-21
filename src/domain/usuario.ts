/**
 * Usuario del sistema. Lo devuelve POST /usuarios/login.
 * Ver docs/backend-endpoints.md.
 */
export type Usuario = {
  usuarioId: number;
  nombre: string;
  apellido: string;
  instaladorId: number;
  movilId: number;
  avatar: string | null;
  /** `YYYY-MM-DD` — fecha del último login según backend. Usada para fallback offline. */
  fecha: string;
};
