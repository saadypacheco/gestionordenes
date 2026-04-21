import { ModoGrabado } from '@/config/constants';
import type { Orden } from '@/domain/orden';
import { apiGet, apiPost } from './client';
import { parseOrdenesList } from './parsers';

/**
 * GET /ordenes/listarInst/"{desde}"/"{hasta}"/{instaladorId}
 *
 * ⚠️ El backend espera las fechas **entre comillas dobles literales** en el path.
 * No encodear — mandarlas tal cual.
 */
export async function listarOrdenes(
  fechaDesde: string,
  fechaHasta: string,
  instaladorId: number,
): Promise<Orden[]> {
  const path = `/ordenes/listarInst/"${fechaDesde}"/"${fechaHasta}"/${instaladorId}`;
  const raw = await apiGet<unknown>(path);
  return parseOrdenesList(raw);
}

/**
 * POST /ordenes/sincronizar
 * Sube órdenes pendientes (sin imágenes — esas van por /guardarImagen aparte).
 *
 * El caller es responsable de pre-filtrar `sincronizado=false` y limpiar `imagenes`
 * y `equipos[].imagen`.
 */
export async function sincronizarOrdenes(ordenes: Orden[]): Promise<void> {
  await apiPost<unknown>('/ordenes/sincronizar', { ordenes });
}

/**
 * POST /ordenes/grabarSincronizar
 * Graba la orden actual + sube pendientes en un solo round-trip.
 * `modo` indica qué parte de la orden está cambiando.
 */
export async function grabarSincronizar(
  ordenActual: Orden,
  pendientes: Orden[],
  modo: ModoGrabado,
): Promise<void> {
  await apiPost<unknown>('/ordenes/grabarSincronizar', {
    ordenes: pendientes,
    ordenActual,
    modo,
  });
}
