import type { EstadoOrden } from '@/config/constants';

/**
 * Modelos del dominio "Orden". Los parsers en `src/api/parsers.ts` los construyen
 * a partir de las respuestas del backend legacy, normalizando el casing mixto.
 * Ver docs/backend-endpoints.md §Entidades.
 */

export type OrdenTarea = {
  tareaId: number;
  descripcion: string;
  cantidad: number;
};

export type OrdenEquipo = {
  equipoId: number | null;
  nroSerie: string | null;
  materialId: number | null;
  descripcion: string | null;
  abonado: boolean | null;
  /** Path local del archivo de imagen (si se tomó foto del equipo). */
  imagen: string | null;
  mimeType: string | null;
  imagenId: string | null;
};

export type OrdenMaterial = {
  materialId: number;
  descripcion: string;
  cantidad: number;
  medidaInicial: number | null;
  medidaFinal: number | null;
  nroSerie: string | null;
  nroSerieR: string | null;
  tipoConsumoId: number | null;
};

export type OrdenImagen = {
  ordenId: number;
  /** UUID generado por el cliente (`expo-crypto.randomUUID()`). */
  imagenId: string;
  /** Base64 cuando viene del backend (`/imagenesListar`). */
  imagen: string | null;
  mimeType: string | null;
  estadoId: number | null;
};

export type Orden = {
  ordenId: number;
  importacionId: number | null;
  clienteId: string | null;
  cliente: string;
  calle: string;
  /** Número de puerta — siempre string porque el backend mezcla number y string,
   *  y SQLite local lo guarda como text. El parser normaliza. */
  numero: string | null;
  domicilio: string | null;
  sector: string | null;
  /** `YYYY-MM-DD` (se normaliza al parsear). */
  fechaInstalacion: string;
  /** `YYYY-MM-DD` (se normaliza al parsear). */
  fechaCarga: string | null;
  comentarios: string;
  estadoId: EstadoOrden;
  estado: string;
  movilId: number | null;
  instaladorId: number;
  usuarioId: number;
  tipoTrabajoId: number | null;

  tareas: OrdenTarea[];
  equipos: OrdenEquipo[];
  recuperos: OrdenEquipo[];
  materiales: OrdenMaterial[];
  imagenes: OrdenImagen[];

  /** True si la orden local está alineada con backend. Se setea false en cada edición. */
  sincronizado: boolean;

  /** Extensiones M6 (GPS, timestamps, firma). Se mandan en datos_extra del backend. */
  iniciadaAt?: string | null;
  cerradaAt?: string | null;
  ubicacion?: string | null;
};
