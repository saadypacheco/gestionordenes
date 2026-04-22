import type { EstadoOrden } from '@/config/constants';
import type {
  Orden,
  OrdenEquipo,
  OrdenImagen,
  OrdenMaterial,
  OrdenTarea,
} from '@/domain/orden';
import type {
  OrdenEquipoRow,
  OrdenImagenRow,
  OrdenMaterialRow,
  OrdenRow,
  OrdenTareaRow,
} from './schema';

/**
 * Mappers puros entre modelos de dominio (`src/domain/orden.ts`) y rows de Drizzle.
 * Funciones sin side-effects — testeables sin DB.
 *
 * Convención:
 *  - `toRow*` = dominio → row (para insert/update)
 *  - `fromRow*` = row → dominio (para queries)
 */

/* ---------- Orden (cabecera) ---------- */

export function toOrdenRow(o: Orden, updatedAt: string = new Date().toISOString()): OrdenRow {
  return {
    ordenId: o.ordenId,
    importacionId: o.importacionId,
    clienteId: o.clienteId,
    cliente: o.cliente,
    calle: o.calle,
    numero: o.numero,
    domicilio: o.domicilio,
    sector: o.sector,
    fechaInstalacion: o.fechaInstalacion,
    fechaCarga: o.fechaCarga,
    comentarios: o.comentarios,
    estadoId: o.estadoId,
    estado: o.estado,
    movilId: o.movilId,
    instaladorId: o.instaladorId,
    usuarioId: o.usuarioId,
    tipoTrabajoId: o.tipoTrabajoId,
    iniciadaAt: o.iniciadaAt ?? null,
    cerradaAt: o.cerradaAt ?? null,
    ubicacion: o.ubicacion ?? null,
    sincronizado: o.sincronizado,
    updatedAt,
  };
}

export function fromOrdenRow(
  r: OrdenRow,
  tareas: OrdenTarea[],
  equipos: OrdenEquipo[],
  recuperos: OrdenEquipo[],
  materiales: OrdenMaterial[],
  imagenes: OrdenImagen[],
): Orden {
  return {
    ordenId: r.ordenId,
    importacionId: r.importacionId,
    clienteId: r.clienteId,
    cliente: r.cliente,
    calle: r.calle,
    numero: r.numero,
    domicilio: r.domicilio,
    sector: r.sector,
    fechaInstalacion: r.fechaInstalacion,
    fechaCarga: r.fechaCarga,
    comentarios: r.comentarios,
    estadoId: r.estadoId as EstadoOrden,
    estado: r.estado,
    movilId: r.movilId,
    instaladorId: r.instaladorId,
    usuarioId: r.usuarioId,
    tipoTrabajoId: r.tipoTrabajoId,
    iniciadaAt: r.iniciadaAt,
    cerradaAt: r.cerradaAt,
    ubicacion: r.ubicacion,
    sincronizado: r.sincronizado,
    tareas,
    equipos,
    recuperos,
    materiales,
    imagenes,
  };
}

/* ---------- Sub-colecciones ---------- */

export function toOrdenTareaRow(ordenId: number, t: OrdenTarea): Omit<OrdenTareaRow, 'id'> {
  return {
    ordenId,
    tareaId: t.tareaId,
    descripcion: t.descripcion,
    cantidad: t.cantidad,
  };
}

export function fromOrdenTareaRow(r: OrdenTareaRow): OrdenTarea {
  return {
    tareaId: r.tareaId,
    descripcion: r.descripcion,
    cantidad: r.cantidad,
  };
}

export function toOrdenEquipoRow(
  ordenId: number,
  e: OrdenEquipo,
  tipo: 'instalado' | 'recuperado',
): Omit<OrdenEquipoRow, 'id'> {
  return {
    ordenId,
    tipo,
    equipoId: e.equipoId,
    nroSerie: e.nroSerie,
    materialId: e.materialId,
    descripcion: e.descripcion,
    abonado: e.abonado,
    imagenUri: e.imagen,
    imagenId: e.imagenId,
    mimeType: e.mimeType,
  };
}

export function fromOrdenEquipoRow(r: OrdenEquipoRow): OrdenEquipo {
  return {
    equipoId: r.equipoId,
    nroSerie: r.nroSerie,
    materialId: r.materialId,
    descripcion: r.descripcion,
    abonado: r.abonado,
    imagen: r.imagenUri,
    imagenId: r.imagenId,
    mimeType: r.mimeType,
  };
}

export function toOrdenMaterialRow(
  ordenId: number,
  m: OrdenMaterial,
): Omit<OrdenMaterialRow, 'id'> {
  return {
    ordenId,
    materialId: m.materialId,
    descripcion: m.descripcion,
    cantidad: m.cantidad,
    medidaInicial: m.medidaInicial,
    medidaFinal: m.medidaFinal,
    nroSerie: m.nroSerie,
    nroSerieR: m.nroSerieR,
    tipoConsumoId: m.tipoConsumoId,
  };
}

export function fromOrdenMaterialRow(r: OrdenMaterialRow): OrdenMaterial {
  return {
    materialId: r.materialId,
    descripcion: r.descripcion,
    cantidad: r.cantidad,
    medidaInicial: r.medidaInicial,
    medidaFinal: r.medidaFinal,
    nroSerie: r.nroSerie,
    nroSerieR: r.nroSerieR,
    tipoConsumoId: r.tipoConsumoId,
  };
}

/** True si el string es un URI local del filesystem. */
function esLocal(s: string | null | undefined): boolean {
  return typeof s === 'string' && s.startsWith('file://');
}

export function toOrdenImagenRow(
  ordenId: number,
  i: OrdenImagen,
  createdAt: string = new Date().toISOString(),
): Omit<OrdenImagenRow, 'id'> {
  const isLocal = esLocal(i.imagen);
  // Default: backend images (base64) are already uploaded; local files need upload.
  // Si la domain especifica `subida` explícito, respetarlo (permite marcar subida=true
  // tras un upload exitoso sin perder el path local).
  const subida = i.subida ?? (i.imagen !== null && !isLocal);
  return {
    ordenId,
    imagenId: i.imagenId,
    imagenUri: isLocal ? i.imagen : null,
    imagenBase64: isLocal ? null : i.imagen,
    mimeType: i.mimeType,
    estadoId: i.estadoId,
    tipo: i.tipo ?? 'foto',
    subida,
    createdAt,
  };
}

export function fromOrdenImagenRow(r: OrdenImagenRow): OrdenImagen {
  return {
    ordenId: r.ordenId,
    imagenId: r.imagenId,
    // Preferimos el path local si está disponible: es más barato de renderizar que base64.
    imagen: r.imagenUri ?? r.imagenBase64,
    mimeType: r.mimeType,
    estadoId: r.estadoId,
    subida: r.subida,
    tipo: r.tipo,
  };
}
