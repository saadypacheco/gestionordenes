import type { Equipo, Material, Tarea, TipoTrabajo } from '@/domain/catalogos';
import { apiGet } from './client';
import {
  parseEquipoCatalogo,
  parseMaterialCatalogo,
  parseTareaCatalogo,
  parseTipoTrabajo,
} from './parsers';

/**
 * Catálogos estáticos del backend. Se cachean en SQLite local (Fase 3) y se
 * refrescan manualmente al hacer pull-to-refresh en la lista de órdenes.
 * Ver AGENTS.md §6 M5.
 */

export async function getTareas(): Promise<Tarea[]> {
  const raw = await apiGet<unknown>('/listas/tareas/');
  return parseTareaCatalogo(raw);
}

export async function getEquiposEnDeposito(): Promise<Equipo[]> {
  const raw = await apiGet<unknown>('/listas/equiposEnDeposito/');
  return parseEquipoCatalogo(raw);
}

export async function getMateriales(): Promise<Material[]> {
  const raw = await apiGet<unknown>('/listas/materiales/');
  return parseMaterialCatalogo(raw);
}

export async function getTiposTrabajo(): Promise<TipoTrabajo[]> {
  const raw = await apiGet<unknown>('/listas/tTrabajo');
  return parseTipoTrabajo(raw);
}
