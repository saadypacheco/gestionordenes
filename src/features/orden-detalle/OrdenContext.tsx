import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Orden } from '@/domain/orden';
import { useOrdenDetalle } from './useOrdenDetalle';

type OrdenContextValue = {
  orden: Orden | null;
  loading: boolean;
  notFound: boolean;
  reload: () => Promise<void>;
};

const OrdenContext = createContext<OrdenContextValue | null>(null);

type Props = {
  ordenId: number | null;
  children: ReactNode;
};

export function OrdenProvider({ ordenId, children }: Props) {
  const { orden, loading, notFound, reload } = useOrdenDetalle(ordenId);

  const value = useMemo<OrdenContextValue>(
    () => ({ orden, loading, notFound, reload }),
    [orden, loading, notFound, reload],
  );

  return <OrdenContext.Provider value={value}>{children}</OrdenContext.Provider>;
}

export function useOrdenContext(): OrdenContextValue {
  const ctx = useContext(OrdenContext);
  if (!ctx) {
    throw new Error('useOrdenContext se usó fuera de <OrdenProvider>');
  }
  return ctx;
}
