import type { ModoGrabado } from '@/config/constants';
import { ApiError, isApiError } from '@/domain/errores';
import { borrarImagen, subirImagen } from '@/api/imagenes';
import { grabarSincronizar } from '@/api/ordenes';
import {
  getOrden,
  markImagenSubida,
  markOrdenSincronizada,
} from '@/db/repositories/ordenes';
import {
  listPending,
  markAttemptFailed,
  removeItem,
} from '@/db/repositories/syncQueue';
import type { SyncQueueRow } from '@/db/schema';
import { estaListo } from './backoff';

/**
 * Worker de sincronización: procesa `sync_queue` y empuja los cambios al backend.
 *
 * Políticas:
 *  - Items se procesan en orden `createdAt ASC` (FIFO).
 *  - Backoff exponencial via `estaListo(intentos, lastAttemptAt)`.
 *  - Errores transitorios (`network`, `timeout`, 5xx) → marca `attemptFailed` y
 *    reintenta en el próximo tick.
 *  - Errores permanentes (4xx) → también marca attemptFailed por ahora; si un
 *    item queda "pegado" con intentos grandes, el usuario lo ve en la UI y
 *    decide. Se puede extender a "descartar" en una versión posterior.
 *  - Concurrencia: no reentrante — si ya hay un worker corriendo, `run()`
 *    retorna inmediatamente. (Ver `_running`).
 *
 * Tests: `syncWorker.test.ts` usa mocks de fetch + repos.
 */

export type SyncResult = {
  procesados: number;
  fallidos: number;
  skipped: number;
  errores: { item: SyncQueueRow; mensaje: string }[];
};

const SYNC_EMPTY: SyncResult = {
  procesados: 0,
  fallidos: 0,
  skipped: 0,
  errores: [],
};

let _running = false;

/**
 * Corre un pase del worker. Devuelve cuántos items se procesaron.
 * Idempotente: si ya hay un pase en curso, retorna `{ procesados: 0, ... }`.
 */
export async function run(ahora: Date = new Date()): Promise<SyncResult> {
  if (_running) return { ...SYNC_EMPTY };
  _running = true;
  const result: SyncResult = { ...SYNC_EMPTY, errores: [] };

  try {
    const items = await listPending();
    for (const item of items) {
      if (!estaListo(item.intentos, item.lastAttemptAt, ahora)) {
        result.skipped++;
        continue;
      }
      try {
        await procesarItem(item);
        await removeItem(item.id);
        result.procesados++;
      } catch (e) {
        const mensaje = formatErr(e);
        await markAttemptFailed(item.id, mensaje);
        result.fallidos++;
        result.errores.push({ item, mensaje });
      }
    }
  } finally {
    _running = false;
  }
  return result;
}

/** Indica si hay un pase en curso. Útil para la UI del tab sync. */
export function isRunning(): boolean {
  return _running;
}

async function procesarItem(item: SyncQueueRow): Promise<void> {
  switch (item.tipo) {
    case 'grabar_orden':
      return procesarGrabarOrden(item);
    case 'subir_imagen':
      return procesarSubirImagen(item);
    case 'borrar_imagen':
      return procesarBorrarImagen(item);
  }
}

async function procesarGrabarOrden(item: SyncQueueRow): Promise<void> {
  if (item.modo === null) {
    throw new ApiError('parse', `grabar_orden ${item.id} sin modo`);
  }
  const orden = await getOrden(item.ordenId);
  if (!orden) {
    // Ya no existe localmente — descartamos el enqueue silenciosamente.
    return;
  }
  // El backend legacy acepta firmas junto con fotos en el mismo endpoint
  // (no distingue tipo), pero las imágenes concretas se suben aparte via
  // subir_imagen. Acá solo mandamos la cabecera y sub-colecciones sin binarios.
  const ordenSinImagenes = { ...orden, imagenes: [] };
  await grabarSincronizar(ordenSinImagenes, [], item.modo as ModoGrabado);
  await markOrdenSincronizada(item.ordenId);
}

async function procesarSubirImagen(item: SyncQueueRow): Promise<void> {
  if (!item.imagenId) {
    throw new ApiError('parse', `subir_imagen ${item.id} sin imagenId`);
  }
  const orden = await getOrden(item.ordenId);
  const imagen = orden?.imagenes.find((i) => i.imagenId === item.imagenId);
  if (!imagen || !imagen.imagen) {
    // La imagen desapareció — probablemente el usuario la borró antes de sync.
    return;
  }
  // Solo subimos archivos locales — si tiene base64 sin URI es porque ya
  // vino del backend.
  if (!imagen.imagen.startsWith('file://')) {
    return;
  }
  await subirImagen(imagen.imagen, item.ordenId, item.imagenId);
  await markImagenSubida(item.imagenId);
}

async function procesarBorrarImagen(item: SyncQueueRow): Promise<void> {
  if (!item.imagenId) {
    throw new ApiError('parse', `borrar_imagen ${item.id} sin imagenId`);
  }
  await borrarImagen(item.ordenId, item.imagenId);
  // La imagen local ya se removió al tap del usuario (ver useFotosMutations.quitar).
}

function formatErr(e: unknown): string {
  if (isApiError(e)) return `${e.kind}: ${e.message}`;
  return e instanceof Error ? e.message : 'Error desconocido';
}
