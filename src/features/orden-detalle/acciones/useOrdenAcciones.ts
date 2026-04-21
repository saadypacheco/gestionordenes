import { useCallback, useState } from 'react';
import { randomUUID } from 'expo-crypto';

import { EstadoOrden, ModoGrabado } from '@/config/constants';
import type { Orden, OrdenImagen } from '@/domain/orden';
import { saveOrden } from '@/db/repositories/ordenes';
import {
  enqueueGrabarOrden,
  enqueueSubirImagen,
} from '@/db/repositories/syncQueue';
import { obtenerUbicacion } from '@/lib/gps';

import { procesarYGuardarFoto } from '../galeria/fotos';
import { useOrdenContext } from '../OrdenContext';

/**
 * Acciones de estado de la orden:
 *  - `iniciar()`: setea `iniciadaAt = now`, mueve estado a EnCurso si venía de
 *    otro, encola `grabar_orden` con `ModoGrabado.Estado`.
 *  - `cerrar({ firmaSourceUri })`: setea `cerradaAt = now`, captura GPS,
 *    procesa la firma como `OrdenImagen(tipo='firma')`, marca estado Cerrada,
 *    encola `grabar_orden(Todo)` + `subir_imagen` de la firma.
 *
 * Todas las mutaciones:
 *  - marcan la orden como `sincronizado=false`
 *  - disparan `reload()` del contexto al terminar
 */

type Estado = {
  saving: boolean;
  accion: 'iniciar' | 'cerrar' | null;
  error: string | null;
  mensajeGps: string | null;
};

const estadoInicial: Estado = {
  saving: false,
  accion: null,
  error: null,
  mensajeGps: null,
};

export type CerrarInput = {
  /** URI temporal (base64 `data:` o `file://`) de la firma renderizada. */
  firmaSourceUri: string;
};

async function persistir(orden: Orden, modo: ModoGrabado): Promise<void> {
  await saveOrden({ ...orden, sincronizado: false });
  await enqueueGrabarOrden(orden.ordenId, modo);
}

export function useOrdenAcciones() {
  const { orden, reload } = useOrdenContext();
  const [estado, setEstado] = useState<Estado>(estadoInicial);

  const iniciar = useCallback(async (): Promise<void> => {
    if (!orden) return;
    setEstado({ ...estadoInicial, saving: true, accion: 'iniciar' });
    try {
      const iniciada: Orden = {
        ...orden,
        iniciadaAt: orden.iniciadaAt ?? new Date().toISOString(),
        estadoId: orden.estadoId === EstadoOrden.Cerrada
          ? orden.estadoId
          : EstadoOrden.EnCurso,
      };
      await persistir(iniciada, ModoGrabado.Estado);
      await reload();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'No se pudo iniciar la orden';
      setEstado({ ...estadoInicial, error: msg });
      throw e;
    } finally {
      setEstado((s) => ({ ...s, saving: false, accion: null }));
    }
  }, [orden, reload]);

  const cerrar = useCallback(
    async (input: CerrarInput): Promise<void> => {
      if (!orden) return;
      setEstado({ ...estadoInicial, saving: true, accion: 'cerrar' });
      try {
        // GPS — silencioso si falla; queda null en ubicacion
        const gps = await obtenerUbicacion();
        const ubicacion = gps.ok ? gps.ubicacion : null;
        const mensajeGps = gps.ok ? null : gps.mensaje;

        // Firma → archivo persistente
        const imagenId = randomUUID();
        const firmaUri = await procesarYGuardarFoto(
          input.firmaSourceUri,
          orden.ordenId,
          imagenId,
        );
        const firma: OrdenImagen = {
          ordenId: orden.ordenId,
          imagenId,
          imagen: firmaUri,
          mimeType: 'image/jpeg',
          estadoId: null,
          subida: false,
          tipo: 'firma',
        };

        const cerrada: Orden = {
          ...orden,
          cerradaAt: new Date().toISOString(),
          ubicacion,
          estadoId: EstadoOrden.Cerrada,
          imagenes: [...orden.imagenes, firma],
        };

        await persistir(cerrada, ModoGrabado.Todo);
        await enqueueSubirImagen(orden.ordenId, imagenId);
        await reload();
        setEstado((s) => ({ ...s, mensajeGps }));
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'No se pudo cerrar la orden';
        setEstado({ ...estadoInicial, error: msg });
        throw e;
      } finally {
        setEstado((s) => ({ ...s, saving: false, accion: null }));
      }
    },
    [orden, reload],
  );

  return {
    iniciar,
    cerrar,
    saving: estado.saving,
    accionActual: estado.accion,
    error: estado.error,
    mensajeGps: estado.mensajeGps,
  };
}
