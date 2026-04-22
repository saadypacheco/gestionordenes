import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Schema de la DB local (SQLite en el dispositivo). NO es la DB de producción —
 * es un cache offline-first en el celular. Ver AGENTS.md §9 y docs/decisiones.md.
 *
 * Relaciones: ordenes 1..N { orden_tareas, orden_equipos, orden_recuperos,
 *   orden_materiales, orden_imagenes }. FK con cascade on delete para limpiar
 *   sub-colecciones al borrar una orden (pero por política nunca hacemos DELETE;
 *   soft-delete via sync_queue).
 *
 * Catálogos (`cat_*`) se sobrescriben en cada refresh desde el backend.
 */

/* ---------- Sesión del instalador ---------- */

export const usuarios = sqliteTable('usuarios', {
  usuarioId: integer('usuario_id').primaryKey(),
  nombre: text('nombre').notNull(),
  apellido: text('apellido').notNull(),
  instaladorId: integer('instalador_id').notNull(),
  movilId: integer('movil_id').notNull(),
  avatar: text('avatar'),
  /** YYYY-MM-DD del último login que vino del backend. Para fallback offline del día. */
  fechaLogin: text('fecha_login').notNull(),
  /** Hash derivado de la password (no la password en claro). Solo valida fallback offline. */
  passwordHash: text('password_hash'),
  updatedAt: text('updated_at').notNull(),
});

/* ---------- Órdenes del día ---------- */

export const ordenes = sqliteTable('ordenes', {
  ordenId: integer('orden_id').primaryKey(),
  importacionId: integer('importacion_id'),
  clienteId: text('cliente_id'),
  cliente: text('cliente').notNull().default(''),
  calle: text('calle').notNull().default(''),
  /** Backend puede devolver number o string — lo guardamos como text. */
  numero: text('numero'),
  domicilio: text('domicilio'),
  sector: text('sector'),
  /** YYYY-MM-DD (normalizada en el parser). */
  fechaInstalacion: text('fecha_instalacion').notNull(),
  fechaCarga: text('fecha_carga'),
  comentarios: text('comentarios').notNull().default(''),
  /** EstadoOrden: 15 (en curso), 20 (cerrada), 90 (anulada). */
  estadoId: integer('estado_id').notNull(),
  estado: text('estado').notNull().default(''),
  movilId: integer('movil_id'),
  instaladorId: integer('instalador_id').notNull(),
  usuarioId: integer('usuario_id').notNull(),
  tipoTrabajoId: integer('tipo_trabajo_id'),

  /* Extensiones M6 — se mandan en datos_extra del backend al sincronizar */
  iniciadaAt: text('iniciada_at'),
  cerradaAt: text('cerrada_at'),
  /** "lat,lng" (backend legacy tiene columna Ubicacion como texto libre). */
  ubicacion: text('ubicacion'),

  /** 1 = alineada con backend · 0 = edición local pendiente. */
  sincronizado: integer('sincronizado', { mode: 'boolean' }).notNull().default(true),
  updatedAt: text('updated_at').notNull(),
});

export const ordenTareas = sqliteTable('orden_tareas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ordenId: integer('orden_id')
    .notNull()
    .references(() => ordenes.ordenId, { onDelete: 'cascade' }),
  tareaId: integer('tarea_id').notNull(),
  descripcion: text('descripcion').notNull(),
  cantidad: integer('cantidad').notNull().default(1),
});

export const ordenEquipos = sqliteTable('orden_equipos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ordenId: integer('orden_id')
    .notNull()
    .references(() => ordenes.ordenId, { onDelete: 'cascade' }),
  /** 'instalado' | 'recuperado' — distingue equipos de recuperos en la misma tabla. */
  tipo: text('tipo', { enum: ['instalado', 'recuperado'] }).notNull(),
  equipoId: integer('equipo_id'),
  nroSerie: text('nro_serie'),
  materialId: integer('material_id'),
  descripcion: text('descripcion'),
  abonado: integer('abonado', { mode: 'boolean' }),
  /** URI local de la imagen del equipo (si se tomó foto). */
  imagenUri: text('imagen_uri'),
  imagenId: text('imagen_id'),
  mimeType: text('mime_type'),
});

export const ordenMateriales = sqliteTable('orden_materiales', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ordenId: integer('orden_id')
    .notNull()
    .references(() => ordenes.ordenId, { onDelete: 'cascade' }),
  materialId: integer('material_id').notNull(),
  descripcion: text('descripcion').notNull(),
  cantidad: integer('cantidad').notNull().default(0),
  medidaInicial: integer('medida_inicial'),
  medidaFinal: integer('medida_final'),
  nroSerie: text('nro_serie'),
  nroSerieR: text('nro_serie_r'),
  tipoConsumoId: integer('tipo_consumo_id'),
});

export const ordenImagenes = sqliteTable('orden_imagenes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ordenId: integer('orden_id')
    .notNull()
    .references(() => ordenes.ordenId, { onDelete: 'cascade' }),
  /** UUID del cliente (expo-crypto.randomUUID()). Primary key del lado del backend. */
  imagenId: text('imagen_id').notNull().unique(),
  /** URI local del archivo JPEG (después de resize/compresión). Null si solo tenemos el base64 del backend. */
  imagenUri: text('imagen_uri'),
  /** Base64 cuando lo bajamos del backend (GET /imagenesListar). */
  imagenBase64: text('imagen_base64'),
  mimeType: text('mime_type'),
  estadoId: integer('estado_id'),
  /** 'firma' si es firma del cliente (M6), null/'foto' si es foto de la instalación. */
  tipo: text('tipo', { enum: ['foto', 'firma'] }).notNull().default('foto'),
  /** 1 = ya subida al backend · 0 = pendiente. */
  subida: integer('subida', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

/* ---------- Catálogos (cache de `/listas/*`) ---------- */

export const catTareas = sqliteTable('cat_tareas', {
  tareaId: integer('tarea_id').primaryKey(),
  descripcion: text('descripcion').notNull(),
  trabajo: text('trabajo'),
  rendicion: text('rendicion'),
  tipoTrabajoId: integer('tipo_trabajo_id'),
  tareaRendicionId: integer('tarea_rendicion_id'),
  desccod: text('desccod'),
});

export const catEquipos = sqliteTable('cat_equipos', {
  equipoId: integer('equipo_id').primaryKey(),
  nroSerie: text('nro_serie'),
  materialId: integer('material_id'),
  descripcion: text('descripcion'),
  abonado: integer('abonado', { mode: 'boolean' }),
});

export const catMateriales = sqliteTable('cat_materiales', {
  materialId: integer('material_id').primaryKey(),
  descripcion: text('descripcion').notNull(),
  codigoSap: integer('codigo_sap'),
});

export const catTiposTrabajo = sqliteTable('cat_tipos_trabajo', {
  tipoTrabajoId: integer('tipo_trabajo_id').primaryKey(),
  descripcion: text('descripcion').notNull(),
});

/* ---------- Cola de sincronización ---------- */

/**
 * Registro de eventos pendientes de empujar al backend.
 * El worker de sync (Fase 8) procesa esta tabla en orden.
 *
 * - `tipo='grabar_orden'` → POST /ordenes/grabarSincronizar con payload de ordenId
 * - `tipo='subir_imagen'` → POST /ordenes/guardarImagen con imagenId
 * - `tipo='borrar_imagen'` → POST /ordenes/borrarImagen con imagenId
 */
export const syncQueue = sqliteTable('sync_queue', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tipo: text('tipo', {
    enum: ['grabar_orden', 'subir_imagen', 'borrar_imagen'],
  }).notNull(),
  /** ordenId cuando tipo='grabar_orden'; ordenId de la imagen cuando tipo='subir_imagen'. */
  ordenId: integer('orden_id').notNull(),
  /** imagenId cuando tipo='subir_imagen'. */
  imagenId: text('imagen_id'),
  /** ModoGrabado (1..7) cuando tipo='grabar_orden'. */
  modo: integer('modo'),
  intentos: integer('intentos').notNull().default(0),
  ultimoError: text('ultimo_error'),
  createdAt: text('created_at').notNull(),
  /** Timestamp del último intento fallido — respetar backoff. */
  lastAttemptAt: text('last_attempt_at'),
});

/* ---------- Tipos inferidos para uso tipado en repos ---------- */

export type UsuarioRow = typeof usuarios.$inferSelect;
export type OrdenRow = typeof ordenes.$inferSelect;
export type OrdenTareaRow = typeof ordenTareas.$inferSelect;
export type OrdenEquipoRow = typeof ordenEquipos.$inferSelect;
export type OrdenMaterialRow = typeof ordenMateriales.$inferSelect;
export type OrdenImagenRow = typeof ordenImagenes.$inferSelect;
export type CatTareaRow = typeof catTareas.$inferSelect;
export type CatEquipoRow = typeof catEquipos.$inferSelect;
export type CatMaterialRow = typeof catMateriales.$inferSelect;
export type CatTipoTrabajoRow = typeof catTiposTrabajo.$inferSelect;
export type SyncQueueRow = typeof syncQueue.$inferSelect;
