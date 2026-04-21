import { clearSesion } from '@/db/repositories/usuarios';
import { useAuthStore } from '@/stores/authStore';

/**
 * Logout: limpia la sesión local. Las órdenes y catálogos quedan en la DB
 * (por si el mismo usuario vuelve a entrar el mismo día y no quiere re-descargar).
 */
export function useLogout() {
  const setUsuario = useAuthStore((s) => s.setUsuario);

  return async () => {
    await clearSesion();
    setUsuario(null);
  };
}
