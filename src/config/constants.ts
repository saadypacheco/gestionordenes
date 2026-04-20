/**
 * Constantes de negocio — AGENTS.md §9 (reglas críticas).
 */

export const MAX_FOTOS_POR_ORDEN = 5;

export const FOTO_MAX_LADO_PX = 1600;
export const FOTO_JPEG_QUALITY = 0.7;

export const HTTP_TIMEOUT_MS = 15_000;
export const HTTP_RETRY_INTENTOS = 2;

export const GPS_TIMEOUT_MS = 8_000;

export const SYNC_BACKGROUND_INTERVAL_MIN = 15;

/**
 * Estados de la orden (según el backend legacy).
 * NO se renumeran — el backend espera estos códigos exactos.
 */
export enum EstadoOrden {
  EnCurso = 15,
  Cerrada = 20,
  Anulada = 90,
}

/**
 * Modos de grabado para /ordenes/grabarSincronizar.
 * NO se renumeran — el backend espera estos códigos exactos.
 */
export enum ModoGrabado {
  Todo = 1,
  Cabecera = 2,
  Estado = 3,
  Tareas = 4,
  Materiales = 5,
  Equipos = 6,
  Fotos = 7,
}
