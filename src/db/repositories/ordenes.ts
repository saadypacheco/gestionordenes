import { eq } from 'drizzle-orm';
import type { Orden } from '@/domain/orden';
import { db } from '../client';
import {
  fromOrdenEquipoRow,
  fromOrdenImagenRow,
  fromOrdenMaterialRow,
  fromOrdenRow,
  fromOrdenTareaRow,
  toOrdenEquipoRow,
  toOrdenImagenRow,
  toOrdenMaterialRow,
  toOrdenRow,
  toOrdenTareaRow,
} from '../mappers';
import {
  ordenEquipos,
  ordenImagenes,
  ordenMateriales,
  ordenTareas,
  ordenes,
} from '../schema';

/**
 * Repositorio de órdenes. Orquesta la cabecera + sub-colecciones en una transacción.
 * Nunca hace DELETE de órdenes — usa flags de sync para mantener la historia.
 * Sí hace DELETE/INSERT de sub-colecciones al guardar (es más simple y seguro que
 * diffing por ID y no hay integridad externa que se rompa).
 */

export async function saveOrden(orden: Orden): Promise<void> {
  const row = toOrdenRow(orden);

  await db.transaction(async (tx) => {
    // upsert cabecera
    await tx
      .insert(ordenes)
      .values(row)
      .onConflictDoUpdate({ target: ordenes.ordenId, set: row });

    // replace sub-colecciones (más simple que diffear)
    await tx.delete(ordenTareas).where(eq(ordenTareas.ordenId, orden.ordenId));
    if (orden.tareas.length > 0) {
      await tx
        .insert(ordenTareas)
        .values(orden.tareas.map((t) => toOrdenTareaRow(orden.ordenId, t)));
    }

    await tx.delete(ordenEquipos).where(eq(ordenEquipos.ordenId, orden.ordenId));
    const equiposRows = [
      ...orden.equipos.map((e) => toOrdenEquipoRow(orden.ordenId, e, 'instalado')),
      ...orden.recuperos.map((e) => toOrdenEquipoRow(orden.ordenId, e, 'recuperado')),
    ];
    if (equiposRows.length > 0) {
      await tx.insert(ordenEquipos).values(equiposRows);
    }

    await tx.delete(ordenMateriales).where(eq(ordenMateriales.ordenId, orden.ordenId));
    if (orden.materiales.length > 0) {
      await tx
        .insert(ordenMateriales)
        .values(orden.materiales.map((m) => toOrdenMaterialRow(orden.ordenId, m)));
    }

    // Imágenes: NO se replacean — son inmutables y pueden estar subiéndose.
    // Insertamos solo las que no existen todavía.
    for (const img of orden.imagenes) {
      await tx
        .insert(ordenImagenes)
        .values(toOrdenImagenRow(orden.ordenId, img))
        .onConflictDoNothing({ target: ordenImagenes.imagenId });
    }
  });
}

/** Reemplaza la lista de órdenes del día con lo que vino del backend. */
export async function replaceOrdenesDelDia(lista: Orden[]): Promise<void> {
  await db.transaction(async () => {
    // No borramos ordenes — solo upsertamos para no perder las que están sin sincronizar
    // (Ver discusión de decisión: si una orden no está en la lista nueva, ¿se borra?
    // Por ahora NO — preferimos mantener hasta que sync pueda empujarlas.)
    for (const orden of lista) {
      await saveOrden(orden);
    }
  });
}

export async function getOrden(ordenId: number): Promise<Orden | null> {
  const [row] = await db.select().from(ordenes).where(eq(ordenes.ordenId, ordenId));
  if (!row) return null;

  const tareas = await db
    .select()
    .from(ordenTareas)
    .where(eq(ordenTareas.ordenId, ordenId));
  const equiposAll = await db
    .select()
    .from(ordenEquipos)
    .where(eq(ordenEquipos.ordenId, ordenId));
  const materiales = await db
    .select()
    .from(ordenMateriales)
    .where(eq(ordenMateriales.ordenId, ordenId));
  const imagenes = await db
    .select()
    .from(ordenImagenes)
    .where(eq(ordenImagenes.ordenId, ordenId));

  return fromOrdenRow(
    row,
    tareas.map(fromOrdenTareaRow),
    equiposAll.filter((e) => e.tipo === 'instalado').map(fromOrdenEquipoRow),
    equiposAll.filter((e) => e.tipo === 'recuperado').map(fromOrdenEquipoRow),
    materiales.map(fromOrdenMaterialRow),
    imagenes.map(fromOrdenImagenRow),
  );
}

export async function listOrdenes(): Promise<Orden[]> {
  const rows = await db.select().from(ordenes);
  const ordenesList: Orden[] = [];
  for (const row of rows) {
    const full = await getOrden(row.ordenId);
    if (full) ordenesList.push(full);
  }
  return ordenesList;
}

export async function listOrdenesPendientesSync(): Promise<Orden[]> {
  const rows = await db.select().from(ordenes).where(eq(ordenes.sincronizado, false));
  const out: Orden[] = [];
  for (const row of rows) {
    const full = await getOrden(row.ordenId);
    if (full) out.push(full);
  }
  return out;
}

export async function markOrdenSincronizada(ordenId: number): Promise<void> {
  await db
    .update(ordenes)
    .set({ sincronizado: true, updatedAt: new Date().toISOString() })
    .where(eq(ordenes.ordenId, ordenId));
}

/**
 * Marca una imagen como ya subida al backend. Preserva `imagenUri` (sigue
 * sirviendo para render local) — solo cambia el flag `subida`.
 */
export async function markImagenSubida(imagenId: string): Promise<void> {
  await db
    .update(ordenImagenes)
    .set({ subida: true })
    .where(eq(ordenImagenes.imagenId, imagenId));
}

export async function clearAllOrdenes(): Promise<void> {
  await db.delete(ordenes); // cascade limpia sub-tablas
}

/**
 * Borra una imagen concreta de una orden. SOLO se usa para deshacer fotos
 * locales que todavía no se subieron al backend (ver Fase 6G.2). Una vez
 * sincronizadas, las imágenes son inmutables desde la app.
 *
 * Marca la orden como `sincronizado=false` para que el sync worker emita un
 * refresh cuando el backend soporte borrado de imágenes; por ahora es
 * local-only y queda huérfana en backend si estaba subida (ver AGENTS.md §12).
 */
export async function removeImagenLocal(ordenId: number, imagenId: string): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .delete(ordenImagenes)
      .where(eq(ordenImagenes.imagenId, imagenId));
    await tx
      .update(ordenes)
      .set({ sincronizado: false, updatedAt: new Date().toISOString() })
      .where(eq(ordenes.ordenId, ordenId));
  });
}
