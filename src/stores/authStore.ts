import { create } from 'zustand';
import type { Usuario } from '@/domain/usuario';

/**
 * Estado de sesión en memoria. Se inicializa leyendo de `src/db/repositories/usuarios.ts`
 * (persistencia real) al arrancar la app. Los hooks de `src/features/auth/` son los
 * únicos que mutan este store.
 *
 * Consumidores: cualquier componente/hook que necesite saber quién está logueado.
 */

type AuthState = {
  /** Usuario actualmente logueado, o null si no hay sesión. */
  usuario: Usuario | null;
  /** True mientras se lee la sesión persistida al arrancar. */
  initializing: boolean;
  /** Setters (solo los hooks de auth deberían llamar a estos). */
  setUsuario: (u: Usuario | null) => void;
  setInitializing: (b: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  initializing: true,
  setUsuario: (usuario) => set({ usuario }),
  setInitializing: (initializing) => set({ initializing }),
}));
