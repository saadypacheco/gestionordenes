import type { Equipo, Material, Tarea, TipoTrabajo } from '@/domain/catalogos';
import { db } from '../client';
import {
  catEquipos,
  catMateriales,
  catTareas,
  catTiposTrabajo,
} from '../schema';

/**
 * Los catálogos son listas estáticas del backend. En cada refresh:
 *  1. Borramos todo lo local
 *  2. Insertamos lo nuevo
 * No hay estado local que preservar (los catálogos no se editan desde la app).
 */

export async function replaceTareas(lista: Tarea[]): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(catTareas);
    if (lista.length > 0) {
      await tx.insert(catTareas).values(
        lista.map((t) => ({
          tareaId: t.tareaId,
          descripcion: t.descripcion,
          trabajo: t.trabajo,
          rendicion: t.rendicion,
          tipoTrabajoId: t.tipoTrabajoId,
          tareaRendicionId: t.tareaRendicionId,
          desccod: t.desccod,
        })),
      );
    }
  });
}

export async function getTareas(): Promise<Tarea[]> {
  const rows = await db.select().from(catTareas);
  return rows.map((r) => ({
    tareaId: r.tareaId,
    descripcion: r.descripcion,
    trabajo: r.trabajo,
    rendicion: r.rendicion,
    tipoTrabajoId: r.tipoTrabajoId,
    tareaRendicionId: r.tareaRendicionId,
    desccod: r.desccod,
  }));
}

export async function replaceEquipos(lista: Equipo[]): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(catEquipos);
    if (lista.length > 0) {
      await tx.insert(catEquipos).values(
        lista.map((e) => ({
          equipoId: e.equipoId,
          nroSerie: e.nroSerie,
          materialId: e.materialId,
          descripcion: e.descripcion,
          abonado: e.abonado,
        })),
      );
    }
  });
}

export async function getEquipos(): Promise<Equipo[]> {
  const rows = await db.select().from(catEquipos);
  return rows.map((r) => ({
    equipoId: r.equipoId,
    nroSerie: r.nroSerie,
    materialId: r.materialId,
    descripcion: r.descripcion,
    abonado: r.abonado,
  }));
}

export async function replaceMateriales(lista: Material[]): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(catMateriales);
    if (lista.length > 0) {
      await tx.insert(catMateriales).values(
        lista.map((m) => ({
          materialId: m.materialId,
          descripcion: m.descripcion,
          codigoSap: m.codigoSap,
        })),
      );
    }
  });
}

export async function getMateriales(): Promise<Material[]> {
  const rows = await db.select().from(catMateriales);
  return rows.map((r) => ({
    materialId: r.materialId,
    descripcion: r.descripcion,
    codigoSap: r.codigoSap,
  }));
}

export async function replaceTiposTrabajo(lista: TipoTrabajo[]): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(catTiposTrabajo);
    if (lista.length > 0) {
      await tx.insert(catTiposTrabajo).values(lista);
    }
  });
}

export async function getTiposTrabajo(): Promise<TipoTrabajo[]> {
  return db.select().from(catTiposTrabajo);
}
