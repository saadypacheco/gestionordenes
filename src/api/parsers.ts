import { EstadoOrden } from '@/config/constants';
import { ApiError } from '@/domain/errores';
import type {
  Orden,
  OrdenEquipo,
  OrdenImagen,
  OrdenMaterial,
  OrdenTarea,
} from '@/domain/orden';
import type { Usuario } from '@/domain/usuario';
import type { Equipo, Material, Tarea, TipoTrabajo } from '@/domain/catalogos';

/**
 * Parsers que normalizan los quirks del backend legacy a tipos del dominio.
 *
 * Quirks cubiertos (ver docs/backend-endpoints.md):
 *  - Responses anidadas como `[[...]]` o `[[{}]]` — desempacar con `unwrap` / `unwrapFirst`
 *  - Casing mixto: `Cantidad` ↔ `cantidad`, `Descripcion` ↔ `descripcion`,
 *    `materialid` ↔ `materialId`, `MAC` ↔ `nroSerie`
 *  - Fechas con hora `"2026-04-20T00:00:00"` → `"2026-04-20"`
 *  - `cliente: "undefined"` string → ""
 *
 * Todos los parsers lanzan `ApiError('parse', ...)` si el shape no es el esperado.
 */

/* ---------- helpers genéricos ---------- */

type Dict = Record<string, unknown>;

const isRecord = (v: unknown): v is Dict => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Toma el primer alias presente. Útil para `Cantidad|cantidad`, etc. */
function pick<T = unknown>(obj: Dict, ...keys: string[]): T | undefined {
  for (const k of keys) {
    if (k in obj && obj[k] !== undefined) return obj[k] as T;
  }
  return undefined;
}

function pickStr(obj: Dict, ...keys: string[]): string | null {
  const v = pick(obj, ...keys);
  if (v === null || v === undefined) return null;
  if (typeof v === 'string') return v === 'undefined' ? '' : v;
  return String(v);
}

function pickNum(obj: Dict, ...keys: string[]): number | null {
  const v = pick(obj, ...keys);
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v);
  return null;
}

function pickBool(obj: Dict, ...keys: string[]): boolean | null {
  const v = pick(obj, ...keys);
  if (v === null || v === undefined) return null;
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v !== 0;
  if (typeof v === 'string') {
    const s = v.toLowerCase();
    if (s === 'true' || s === '1' || s === 'si' || s === 'sí') return true;
    if (s === 'false' || s === '0' || s === 'no') return false;
  }
  return null;
}

/** Normaliza `"2026-04-20T00:00:00"` o `"2026-04-20T00:00:00.000Z"` a `"2026-04-20"`. */
function normalizeFecha(raw: string | null | undefined): string | null {
  if (!raw) return null;
  // tomar los primeros 10 chars si son un fragment de ISO
  if (raw.length >= 10 && raw[4] === '-' && raw[7] === '-') return raw.substring(0, 10);
  return raw;
}

/* ---------- unwrappers ---------- */

/**
 * La mayoría de las responses del backend vienen como `[[{...}, {...}]]` — un array
 * de arrays donde el primero es el que importa. Este helper desempaca ese nivel.
 */
export function unwrap<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) {
    // Caso 1: `[[...]]` — array de arrays
    if (raw.length > 0 && Array.isArray(raw[0])) return raw[0] as T[];
    // Caso 2: `[...]` directo (algunos endpoints lo devuelven así, ej /ordenes/listarInst)
    return raw as T[];
  }
  throw new ApiError('parse', `Expected array response, got ${typeof raw}`);
}

/** Desempaca `[[{...}]]` y devuelve el primer elemento, o null si vacío. */
export function unwrapFirst<T>(raw: unknown): T | null {
  const arr = unwrap<T>(raw);
  return arr.length > 0 ? arr[0] : null;
}

/* ---------- parsers por entidad ---------- */

export function parseUsuario(raw: unknown): Usuario | null {
  const obj = unwrapFirst<Dict>(raw);
  if (!obj || !isRecord(obj)) return null;

  const usuarioId = pickNum(obj, 'usuarioId');
  const instaladorId = pickNum(obj, 'instaladorId');
  const movilId = pickNum(obj, 'movilId');
  if (usuarioId === null || instaladorId === null) return null;

  return {
    usuarioId,
    nombre: pickStr(obj, 'Nombre', 'nombre') ?? '',
    apellido: pickStr(obj, 'Apellido', 'apellido') ?? '',
    instaladorId,
    movilId: movilId ?? (null as unknown as number),
    avatar: pickStr(obj, 'avatar'),
    fecha: normalizeFecha(pickStr(obj, 'fecha')) ?? '',
  };
}

function parseOrdenTarea(obj: Dict): OrdenTarea {
  return {
    tareaId: pickNum(obj, 'tareaId', 'tareaid') ?? 0,
    descripcion: pickStr(obj, 'Descripcion', 'descripcion') ?? '',
    cantidad: pickNum(obj, 'cantidad', 'Cantidad') ?? 1,
  };
}

function parseOrdenEquipo(obj: Dict): OrdenEquipo {
  return {
    equipoId: pickNum(obj, 'equipoId', 'equipoid'),
    nroSerie: pickStr(obj, 'nroSerie', 'MAC'),
    materialId: pickNum(obj, 'materialId', 'materialid'),
    descripcion: pickStr(obj, 'descripcion', 'Descripcion'),
    abonado: pickBool(obj, 'abonado'),
    imagen: pickStr(obj, 'imagen'),
    mimeType: pickStr(obj, 'mimeType'),
    imagenId: pickStr(obj, 'imagenId'),
  };
}

function parseOrdenMaterial(obj: Dict): OrdenMaterial {
  return {
    materialId: pickNum(obj, 'materialId', 'materialid') ?? 0,
    descripcion: pickStr(obj, 'Descripcion', 'descripcion') ?? '',
    cantidad: pickNum(obj, 'Cantidad', 'cantidad') ?? 0,
    medidaInicial: pickNum(obj, 'medidaInicial'),
    medidaFinal: pickNum(obj, 'medidaFinal'),
    nroSerie: pickStr(obj, 'nroSerie'),
    nroSerieR: pickStr(obj, 'nroSerieR'),
    tipoConsumoId: pickNum(obj, 'tipoConsumoId'),
  };
}

function parseOrdenImagen(obj: Dict): OrdenImagen {
  return {
    ordenId: pickNum(obj, 'ordenId') ?? 0,
    imagenId: pickStr(obj, 'imagenId') ?? '',
    imagen: pickStr(obj, 'imagen'),
    mimeType: pickStr(obj, 'mimeType'),
    estadoId: pickNum(obj, 'estadoId'),
  };
}

/** Parsea una orden cruda del backend. El estadoId debe matchear uno de los valores del enum. */
export function parseOrden(obj: Dict): Orden {
  const ordenId = pickNum(obj, 'ordenId');
  if (ordenId === null) throw new ApiError('parse', 'Orden sin ordenId');

  const estadoIdRaw = pickNum(obj, 'estadoId');
  const estadoId = (estadoIdRaw ?? EstadoOrden.EnCurso) as EstadoOrden;

  const tareasRaw = (pick(obj, 'tareas') ?? []) as Dict[];
  const equiposRaw = (pick(obj, 'equipos') ?? []) as Dict[];
  const recuperosRaw = (pick(obj, 'recuperos') ?? []) as Dict[];
  const materialesRaw = (pick(obj, 'materiales') ?? []) as Dict[];
  const imagenesRaw = (pick(obj, 'imagenes') ?? []) as Dict[];

  return {
    ordenId,
    importacionId: pickNum(obj, 'importacionId'),
    clienteId: pickStr(obj, 'clienteID', 'clienteId'),
    cliente: pickStr(obj, 'cliente') ?? '',
    calle: pickStr(obj, 'calle') ?? '',
    numero: (pick(obj, 'numero') ?? null) as Orden['numero'],
    domicilio: pickStr(obj, 'Domicilio', 'domicilio'),
    sector: pickStr(obj, 'Sector', 'sector'),
    fechaInstalacion: normalizeFecha(pickStr(obj, 'fechaInstalacion')) ?? '',
    fechaCarga: normalizeFecha(pickStr(obj, 'fechaCarga')),
    comentarios: pickStr(obj, 'comentarios') ?? '',
    estadoId,
    estado: pickStr(obj, 'Estado', 'estado') ?? '',
    movilId: pickNum(obj, 'movilId'),
    instaladorId: pickNum(obj, 'instaladorId') ?? 0,
    usuarioId: pickNum(obj, 'usuarioId') ?? 0,
    tipoTrabajoId: pickNum(obj, 'tipoTrabajoId'),

    tareas: tareasRaw.map(parseOrdenTarea),
    equipos: equiposRaw.map(parseOrdenEquipo),
    recuperos: recuperosRaw.map(parseOrdenEquipo),
    materiales: materialesRaw.map(parseOrdenMaterial),
    imagenes: imagenesRaw.map(parseOrdenImagen),

    sincronizado: true, // lo que viene del backend está alineado por definición
  };
}

/**
 * Lista de órdenes — `GET /ordenes/listarInst/.../...`.
 * Response viene como array directo (no anidado) según el legacy.
 */
export function parseOrdenesList(raw: unknown): Orden[] {
  if (!Array.isArray(raw)) {
    throw new ApiError('parse', `Expected orden list, got ${typeof raw}`);
  }
  return raw.map((o) => {
    if (!isRecord(o)) throw new ApiError('parse', 'Orden item is not an object');
    return parseOrden(o);
  });
}

/* ---------- parsers de catálogos ---------- */

export function parseTareaCatalogo(raw: unknown): Tarea[] {
  const arr = unwrap<Dict>(raw);
  return arr.map((obj) => ({
    tareaId: pickNum(obj, 'tareaId') ?? 0,
    descripcion: pickStr(obj, 'descripcion', 'Descripcion') ?? '',
    trabajo: pickStr(obj, 'Trabajo', 'trabajo'),
    rendicion: pickStr(obj, 'Rendicion', 'rendicion'),
    tipoTrabajoId: pickNum(obj, 'tipoTrabajoId'),
    tareaRendicionId: pickNum(obj, 'tareaRendicionId'),
    desccod: pickStr(obj, 'desccod'),
  }));
}

export function parseEquipoCatalogo(raw: unknown): Equipo[] {
  const arr = unwrap<Dict>(raw);
  return arr.map((obj) => ({
    equipoId: pickNum(obj, 'equipoId', 'equipoid') ?? 0,
    nroSerie: pickStr(obj, 'nroSerie', 'MAC'),
    materialId: pickNum(obj, 'materialId', 'materialid'),
    descripcion: pickStr(obj, 'descripcion', 'Descripcion'),
    abonado: pickBool(obj, 'abonado'),
  }));
}

export function parseMaterialCatalogo(raw: unknown): Material[] {
  const arr = unwrap<Dict>(raw);
  return arr.map((obj) => ({
    materialId: pickNum(obj, 'materialId', 'materialid') ?? 0,
    descripcion: pickStr(obj, 'descripcion', 'Descripcion') ?? '',
    codigoSap: pickNum(obj, 'codigoSap'),
  }));
}

export function parseTipoTrabajo(raw: unknown): TipoTrabajo[] {
  const arr = unwrap<Dict>(raw);
  return arr.map((obj) => ({
    tipoTrabajoId: pickNum(obj, 'tipoTrabajoId') ?? 0,
    descripcion: pickStr(obj, 'descripcion', 'Descripcion') ?? '',
  }));
}

/* ---------- imágenes ---------- */

export function parseImagenesList(raw: unknown): OrdenImagen[] {
  const arr = unwrap<Dict>(raw);
  return arr.map(parseOrdenImagen);
}
