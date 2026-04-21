import { useCallback, useEffect, useState } from 'react';
import type { Orden } from '@/domain/orden';
import { getOrden } from '@/db/repositories/ordenes';

/**
 * Hook offline-first para el detalle de una orden:
 *  - Lee de la DB local (source of truth)
 *  - Expone `reload()` para refrescar desde DB tras ediciones locales
 *  - NO consulta al backend (fetch remoto del detalle se agrega en Fase 8 con el syncWorker)
 *
 * Retorna `null` si la orden no existe localmente.
 */

type Estado = {
  orden: Orden | null;
  loading: boolean;
  notFound: boolean;
};

const estadoInicial: Estado = {
  orden: null,
  loading: true,
  notFound: false,
};

export function useOrdenDetalle(ordenId: number | null) {
  const [estado, setEstado] = useState<Estado>(estadoInicial);

  const reload = useCallback(async () => {
    if (ordenId === null || Number.isNaN(ordenId)) {
      setEstado({ orden: null, loading: false, notFound: true });
      return;
    }
    const orden = await getOrden(ordenId);
    setEstado({
      orden,
      loading: false,
      notFound: orden === null,
    });
  }, [ordenId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setEstado((s) => ({ ...s, loading: true }));
      if (ordenId === null || Number.isNaN(ordenId)) {
        if (!cancelled) setEstado({ orden: null, loading: false, notFound: true });
        return;
      }
      const orden = await getOrden(ordenId);
      if (cancelled) return;
      setEstado({ orden, loading: false, notFound: orden === null });
    })();
    return () => {
      cancelled = true;
    };
  }, [ordenId]);

  return {
    ...estado,
    reload,
  };
}
