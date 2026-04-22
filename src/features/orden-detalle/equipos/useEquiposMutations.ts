import { useCallback, useState } from 'react';
import { ModoGrabado } from '@/config/constants';
import type { Orden, OrdenEquipo } from '@/domain/orden';
import { saveOrden } from '@/db/repositories/ordenes';
import { enqueueGrabarOrden } from '@/db/repositories/syncQueue';
import { getEquipos } from '@/db/repositories/catalogos';
import { useOrdenContext } from '../OrdenContext';
import { normalizarNroSerie } from './validators';

/**
 * Mutaciones de equipos instalados en una orden:
 *  - `agregar`: suma un equipo (con lookup opcional al catálogo si solo hay nroSerie)
 *  - `quitar`: saca un equipo por índice
 *
 * Ambas marcan la orden como `sincronizado=false` y encolan un
 * `grabar_orden` con `ModoGrabado.Equipos` para que el syncWorker (Fase 8)
 * la empuje al backend.
 *
 * Actualización optimista: persistimos en DB primero y disparamos `reload()`
 * del contexto para refrescar la UI.
 */

export type AgregarEquipoInput = {
  nroSerie: string;
  descripcion?: string;
  abonado?: boolean;
};

async function enriquecerDesdeCatalogo(input: AgregarEquipoInput): Promise<OrdenEquipo> {
  const nroSerie = normalizarNroSerie(input.nroSerie);
  const catalogo = await getEquipos();
  const match = catalogo.find(
    (e) => (e.nroSerie ?? '').trim().toUpperCase() === nroSerie,
  );
  return {
    equipoId: match?.equipoId ?? null,
    nroSerie,
    materialId: match?.materialId ?? null,
    descripcion: input.descripcion?.trim() || match?.descripcion || null,
    abonado: input.abonado ?? match?.abonado ?? null,
    imagen: null,
    mimeType: null,
    imagenId: null,
  };
}

async function persistirOrden(orden: Orden): Promise<void> {
  const nueva: Orden = {
    ...orden,
    sincronizado: false,
  };
  await saveOrden(nueva);
  await enqueueGrabarOrden(orden.ordenId, ModoGrabado.Equipos);
}

export function useEquiposMutations() {
  const { orden, reload } = useOrdenContext();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregar = useCallback(
    async (input: AgregarEquipoInput): Promise<{ duplicado: boolean }> => {
      if (!orden) return { duplicado: false };
      const nuevo = await enriquecerDesdeCatalogo(input);

      const yaExiste = orden.equipos.some(
        (e) => (e.nroSerie ?? '').toUpperCase() === nuevo.nroSerie,
      );
      if (yaExiste) return { duplicado: true };

      setSaving(true);
      setError(null);
      try {
        await persistirOrden({
          ...orden,
          equipos: [...orden.equipos, nuevo],
        });
        await reload();
        return { duplicado: false };
      } catch (e) {
        setError(e instanceof Error ? e.message : 'No se pudo guardar el equipo');
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [orden, reload],
  );

  const quitar = useCallback(
    async (index: number): Promise<void> => {
      if (!orden) return;
      if (index < 0 || index >= orden.equipos.length) return;
      setSaving(true);
      setError(null);
      try {
        const equipos = orden.equipos.filter((_, i) => i !== index);
        await persistirOrden({ ...orden, equipos });
        await reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'No se pudo quitar el equipo');
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [orden, reload],
  );

  return { agregar, quitar, saving, error };
}
