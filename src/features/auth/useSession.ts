import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { clearSesion, getSesion } from '@/db/repositories/usuarios';
import { fechaHoyStr, mismaFecha } from '@/lib/fecha';

/**
 * Hook que carga la sesión persistida al arrancar. Se llama una sola vez desde
 * `app/_layout.tsx` después de que las migraciones corrieron.
 *
 * Política: la sesión vale **solo para el día en que se logueó**. Si hoy es
 * distinto al `fechaLogin` persistido, se limpia y se fuerza un nuevo login.
 * Igual que el legacy.
 */
export function useBootstrapSession(): void {
  const setUsuario = useAuthStore((s) => s.setUsuario);
  const setInitializing = useAuthStore((s) => s.setInitializing);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const usuario = await getSesion();
        if (cancelled) return;

        if (!usuario) {
          setUsuario(null);
          return;
        }

        // Si la sesión es de otro día, la invalidamos
        if (!mismaFecha(usuario.fecha, fechaHoyStr())) {
          await clearSesion();
          setUsuario(null);
          return;
        }

        // Sesión válida del día
        setUsuario(usuario);
      } finally {
        if (!cancelled) setInitializing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [setUsuario, setInitializing]);
}

/** Snapshot simple del usuario (sin ciclo inicializador). */
export function useUsuario() {
  return useAuthStore((s) => s.usuario);
}

/** True mientras estamos leyendo la sesión del storage (primer render). */
export function useAuthInitializing() {
  return useAuthStore((s) => s.initializing);
}
