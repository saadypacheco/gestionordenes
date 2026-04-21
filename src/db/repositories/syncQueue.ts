import { asc, eq } from 'drizzle-orm';
import type { ModoGrabado } from '@/config/constants';
import { db } from '../client';
import { syncQueue, type SyncQueueRow } from '../schema';

/**
 * Cola de sincronización: cuando el instalador edita algo offline, encolamos
 * aquí el evento. El worker (Fase 8) procesa esta tabla en orden.
 *
 * Duplicados: para `grabar_orden` del mismo ordenId, colapsamos a uno
 * (no tiene sentido mandar 5 veces la misma orden). Para `subir_imagen`
 * cada imagenId es única.
 */

export async function enqueueGrabarOrden(ordenId: number, modo: ModoGrabado): Promise<void> {
  // Si ya hay un grabar_orden pendiente para esta orden, solo actualizamos modo
  const existing = await db
    .select()
    .from(syncQueue)
    .where(eq(syncQueue.ordenId, ordenId));
  const existingGrabar = existing.find((r) => r.tipo === 'grabar_orden');

  if (existingGrabar) {
    await db
      .update(syncQueue)
      .set({ modo, intentos: 0, ultimoError: null })
      .where(eq(syncQueue.id, existingGrabar.id));
    return;
  }

  await db.insert(syncQueue).values({
    tipo: 'grabar_orden',
    ordenId,
    modo,
    createdAt: new Date().toISOString(),
  });
}

export async function enqueueSubirImagen(ordenId: number, imagenId: string): Promise<void> {
  await db
    .insert(syncQueue)
    .values({
      tipo: 'subir_imagen',
      ordenId,
      imagenId,
      createdAt: new Date().toISOString(),
    });
}

export async function listPending(): Promise<SyncQueueRow[]> {
  return db.select().from(syncQueue).orderBy(asc(syncQueue.createdAt));
}

export async function removeItem(id: number): Promise<void> {
  await db.delete(syncQueue).where(eq(syncQueue.id, id));
}

export async function markAttemptFailed(id: number, error: string): Promise<void> {
  const now = new Date().toISOString();
  const [row] = await db.select().from(syncQueue).where(eq(syncQueue.id, id));
  if (!row) return;
  await db
    .update(syncQueue)
    .set({
      intentos: row.intentos + 1,
      ultimoError: error,
      lastAttemptAt: now,
    })
    .where(eq(syncQueue.id, id));
}

export async function countPending(): Promise<number> {
  const rows = await db.select().from(syncQueue);
  return rows.length;
}
