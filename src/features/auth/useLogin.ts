import { useState } from 'react';
import { login as apiLogin } from '@/api/auth';
import { isApiError } from '@/domain/errores';
import type { Usuario } from '@/domain/usuario';
import {
  getSesionConHash,
  saveSesion,
} from '@/db/repositories/usuarios';
import { useAuthStore } from '@/stores/authStore';
import { derivarHashLogin, matchHashLogin } from '@/lib/hash';
import { fechaHoyStr, mismaFecha } from '@/lib/fecha';

/**
 * Mutation de login. Estrategia en dos caminos:
 *
 *   1) ONLINE (hay red): POST /usuarios/login
 *      - 200 con usuario válido + movilId → guardamos sesión + hash → OK
 *      - 200 con usuario pero movilId null → rechazar
 *      - 200 con [[]] → credenciales inválidas
 *      - Error de red → intentar camino 2
 *
 *   2) OFFLINE (sin red): verificar contra último login del mismo día
 *      - Si hay sesión guardada con fechaLogin=hoy y el hash matchea → OK
 *      - Si no → rechazar con "sin conexión y sin login previo hoy"
 *
 * Mensajes en español para que el instalador entienda. Nunca exponer errores crudos del backend.
 */

export type LoginError = {
  code:
    | 'credenciales'
    | 'sin_movil'
    | 'red_sin_fallback'
    | 'sesion_dia_distinto'
    | 'desconocido';
  mensaje: string;
};

export type LoginResult = { ok: true; usuario: Usuario } | { ok: false; error: LoginError };

export function useLoginMutation() {
  const setUsuario = useAuthStore((s) => s.setUsuario);
  const [pending, setPending] = useState(false);

  const ejecutar = async (xalias: string, xpass: string): Promise<LoginResult> => {
    setPending(true);
    try {
      // Derivamos el hash una sola vez (lo usamos en ambos caminos)
      const hash = await derivarHashLogin(xalias, xpass);

      try {
        // Camino 1: online
        const usuarioBackend = await apiLogin(xalias, xpass);

        if (!usuarioBackend) {
          return {
            ok: false,
            error: { code: 'credenciales', mensaje: 'Usuario o contraseña incorrectos.' },
          };
        }
        if (!usuarioBackend.movilId) {
          return {
            ok: false,
            error: { code: 'sin_movil', mensaje: 'El usuario no tiene un móvil asignado.' },
          };
        }

        await saveSesion(usuarioBackend, hash);
        setUsuario(usuarioBackend);
        return { ok: true, usuario: usuarioBackend };
      } catch (err) {
        // Camino 2: fallback offline — sólo si el error es de red/timeout
        if (isApiError(err) && (err.kind === 'network' || err.kind === 'timeout')) {
          const guardado = await getSesionConHash();
          const hoy = fechaHoyStr();

          if (
            guardado &&
            guardado.passwordHash &&
            mismaFecha(guardado.usuario.fecha, hoy) &&
            (await matchHashLogin(xalias, xpass, guardado.passwordHash))
          ) {
            setUsuario(guardado.usuario);
            return { ok: true, usuario: guardado.usuario };
          }

          return {
            ok: false,
            error: {
              code: 'red_sin_fallback',
              mensaje:
                'Sin conexión y no hay un inicio de sesión del día con ese usuario y contraseña.',
            },
          };
        }
        // Otros errores (HTTP 4xx, parse...) — tratar como credenciales/problema del servidor
        return {
          ok: false,
          error: {
            code: 'desconocido',
            mensaje: 'No se pudo iniciar sesión. Intentá de nuevo en un rato.',
          },
        };
      }
    } finally {
      setPending(false);
    }
  };

  return { ejecutar, pending };
}
