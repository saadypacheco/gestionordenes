import { useCallback, useEffect, useState } from 'react';
import { listarOrdenes } from '@/api/ordenes';
import { isApiError } from '@/domain/errores';
import type { Orden } from '@/domain/orden';
import { listOrdenes, saveOrden } from '@/db/repositories/ordenes';
import { useAuthStore } from '@/stores/authStore';
import { useNetwork } from '@/hooks/useNetwork';
import { fechaHoyStr } from '@/lib/fecha';

/**
 * Hook offline-first de lista de órdenes del día:
 *  - Lee SIEMPRE de la DB local (source of truth para render)
 *  - Al montar: dispara fetch del backend si hay red, y persiste en DB
 *  - Expone `refresh()` para pull-to-refresh
 *  - Expone `online` + `lastError` para banners/UI de estado
 *
 * No usa TanStack Query acá — queremos control fino del flujo offline.
 *
 * Política de errores:
 *  - Error de red: silenciamos y mostramos lo que hay en local (con banner offline)
 *  - Error 4xx/5xx/parse: guardamos el último error para que la UI lo pueda mostrar
 *    pero NO limpiamos los datos locales
 */

type Estado = {
  ordenes: Orden[];
  loading: boolean;      // cargando lista inicial desde DB
  refreshing: boolean;   // pull-to-refresh o primer fetch en curso
  lastError: string | null;
};

const estadoInicial: Estado = {
  ordenes: [],
  loading: true,
  refreshing: false,
  lastError: null,
};

export function useOrdenesDelDia() {
  const instaladorId = useAuthStore((s) => s.usuario?.instaladorId ?? null);
  const { online } = useNetwork();
  const [estado, setEstado] = useState<Estado>(estadoInicial);

  const cargarLocal = useCallback(async () => {
    const lista = await listOrdenes();
    setEstado((s) => ({ ...s, ordenes: lista, loading: false }));
  }, []);

  const fetchRemoto = useCallback(async () => {
    if (instaladorId === null) return;
    setEstado((s) => ({ ...s, refreshing: true }));
    try {
      const fecha = fechaHoyStr();
      const remotas = await listarOrdenes(fecha, fecha, instaladorId);
      // Persiste cada orden — preserva `sincronizado=false` de las que tengan edición local
      // porque `saveOrden` hace upsert y no pisa flags si vienen del backend marcando sincronizado=true.
      // Nota: si una orden local pendiente de sync YA NO está en la lista del día, queda huérfana
      // en la DB — el sync worker (Fase 8) se ocupa.
      for (const orden of remotas) {
        await saveOrden(orden);
      }
      await cargarLocal();
      setEstado((s) => ({ ...s, refreshing: false, lastError: null }));
    } catch (err) {
      const mensaje = isApiError(err)
        ? err.kind === 'network' || err.kind === 'timeout'
          ? null // silencioso si es problema de red — el banner offline lo refleja
          : `No se pudieron traer las órdenes (${err.kind})`
        : 'Error desconocido al traer las órdenes';
      setEstado((s) => ({ ...s, refreshing: false, lastError: mensaje }));
    }
  }, [instaladorId, cargarLocal]);

  // Primer render: carga local + kick-off fetch remoto si hay red
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await cargarLocal();
      if (cancelled) return;
      if (online) {
        await fetchRemoto();
      }
    })();
    return () => {
      cancelled = true;
    };
    // Deliberadamente NO incluimos fetchRemoto en deps — cambia cuando cambia
    // instaladorId, y queremos el fetch solo al primer mount. El refresh manual
    // es el camino para re-fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargarLocal]);

  return {
    ...estado,
    online,
    refresh: fetchRemoto,
  };
}
