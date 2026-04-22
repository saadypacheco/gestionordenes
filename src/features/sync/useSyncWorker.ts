import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useNetwork } from '@/hooks/useNetwork';
import {
  countPending,
  listPending,
} from '@/db/repositories/syncQueue';
import type { SyncQueueRow } from '@/db/schema';

import { isRunning, run, type SyncResult } from './syncWorker';

/**
 * Hook para consumir el syncWorker desde la UI.
 *
 * Expone:
 *  - `pending`: items en la cola (para mostrar contador + último error)
 *  - `running`: true mientras un pase está en curso
 *  - `ultimoResultado`: resultado del último pase (para mostrar errores)
 *  - `sincronizar()`: dispara un pase manual
 *
 * Se auto-dispara cuando:
 *  - La app vuelve a foreground y hay conexión.
 *  - Cambia de offline a online y hay pendientes.
 */

type Estado = {
  pending: SyncQueueRow[];
  running: boolean;
  ultimoResultado: SyncResult | null;
  autoCorriendo: boolean;
};

const estadoInicial: Estado = {
  pending: [],
  running: false,
  ultimoResultado: null,
  autoCorriendo: false,
};

export function useSyncWorker() {
  const { online } = useNetwork();
  const [estado, setEstado] = useState<Estado>(estadoInicial);
  const onlineRef = useRef(online);
  onlineRef.current = online;

  const refrescarCola = useCallback(async () => {
    const items = await listPending();
    setEstado((s) => ({ ...s, pending: items }));
  }, []);

  const sincronizar = useCallback(async (): Promise<SyncResult> => {
    if (isRunning()) {
      return { procesados: 0, fallidos: 0, skipped: 0, errores: [] };
    }
    if (!onlineRef.current) {
      return { procesados: 0, fallidos: 0, skipped: 0, errores: [] };
    }
    setEstado((s) => ({ ...s, running: true }));
    try {
      const res = await run();
      setEstado((s) => ({ ...s, running: false, ultimoResultado: res }));
      await refrescarCola();
      return res;
    } catch (e) {
      setEstado((s) => ({ ...s, running: false }));
      throw e;
    }
  }, [refrescarCola]);

  // Init + suscripción a cambios
  useEffect(() => {
    refrescarCola();
  }, [refrescarCola]);

  // Auto-run al volver a foreground con conexión
  useEffect(() => {
    const handler = async (next: AppStateStatus) => {
      if (next === 'active' && onlineRef.current) {
        const total = await countPending();
        if (total > 0) {
          void sincronizar();
        }
      }
    };
    const sub = AppState.addEventListener('change', handler);
    return () => sub.remove();
  }, [sincronizar]);

  // Auto-run al transicionar offline → online
  useEffect(() => {
    if (online && estado.pending.length > 0 && !estado.running) {
      void sincronizar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  return {
    pending: estado.pending,
    pendingCount: estado.pending.length,
    running: estado.running,
    online,
    ultimoResultado: estado.ultimoResultado,
    sincronizar,
    refrescarCola,
  };
}
