/**
 * Catálogos que vienen del backend (`/listas/*`) y cacheamos en SQLite local.
 * Ver docs/backend-endpoints.md y AGENTS.md §2.
 */

export type Tarea = {
  tareaId: number;
  descripcion: string;
  trabajo: string | null;
  rendicion: string | null;
  tipoTrabajoId: number | null;
  tareaRendicionId: number | null;
  desccod: string | null;
};

export type Equipo = {
  equipoId: number;
  nroSerie: string | null;
  materialId: number | null;
  descripcion: string | null;
  abonado: boolean | null;
};

export type Material = {
  materialId: number;
  descripcion: string;
  codigoSap: number | null;
};

export type TipoTrabajo = {
  tipoTrabajoId: number;
  descripcion: string;
};
