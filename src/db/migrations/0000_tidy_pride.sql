CREATE TABLE `cat_equipos` (
	`equipo_id` integer PRIMARY KEY NOT NULL,
	`nro_serie` text,
	`material_id` integer,
	`descripcion` text,
	`abonado` integer
);
--> statement-breakpoint
CREATE TABLE `cat_materiales` (
	`material_id` integer PRIMARY KEY NOT NULL,
	`descripcion` text NOT NULL,
	`codigo_sap` integer
);
--> statement-breakpoint
CREATE TABLE `cat_tareas` (
	`tarea_id` integer PRIMARY KEY NOT NULL,
	`descripcion` text NOT NULL,
	`trabajo` text,
	`rendicion` text,
	`tipo_trabajo_id` integer,
	`tarea_rendicion_id` integer,
	`desccod` text
);
--> statement-breakpoint
CREATE TABLE `cat_tipos_trabajo` (
	`tipo_trabajo_id` integer PRIMARY KEY NOT NULL,
	`descripcion` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orden_equipos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orden_id` integer NOT NULL,
	`tipo` text NOT NULL,
	`equipo_id` integer,
	`nro_serie` text,
	`material_id` integer,
	`descripcion` text,
	`abonado` integer,
	`imagen_uri` text,
	`imagen_id` text,
	`mime_type` text,
	FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`orden_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orden_imagenes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orden_id` integer NOT NULL,
	`imagen_id` text NOT NULL,
	`imagen_uri` text,
	`imagen_base64` text,
	`mime_type` text,
	`estado_id` integer,
	`tipo` text DEFAULT 'foto' NOT NULL,
	`subida` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`orden_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orden_imagenes_imagen_id_unique` ON `orden_imagenes` (`imagen_id`);--> statement-breakpoint
CREATE TABLE `orden_materiales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orden_id` integer NOT NULL,
	`material_id` integer NOT NULL,
	`descripcion` text NOT NULL,
	`cantidad` integer DEFAULT 0 NOT NULL,
	`medida_inicial` integer,
	`medida_final` integer,
	`nro_serie` text,
	`nro_serie_r` text,
	`tipo_consumo_id` integer,
	FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`orden_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orden_tareas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orden_id` integer NOT NULL,
	`tarea_id` integer NOT NULL,
	`descripcion` text NOT NULL,
	`cantidad` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`orden_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ordenes` (
	`orden_id` integer PRIMARY KEY NOT NULL,
	`importacion_id` integer,
	`cliente_id` text,
	`cliente` text DEFAULT '' NOT NULL,
	`calle` text DEFAULT '' NOT NULL,
	`numero` text,
	`domicilio` text,
	`sector` text,
	`fecha_instalacion` text NOT NULL,
	`fecha_carga` text,
	`comentarios` text DEFAULT '' NOT NULL,
	`estado_id` integer NOT NULL,
	`estado` text DEFAULT '' NOT NULL,
	`movil_id` integer,
	`instalador_id` integer NOT NULL,
	`usuario_id` integer NOT NULL,
	`tipo_trabajo_id` integer,
	`iniciada_at` text,
	`cerrada_at` text,
	`ubicacion` text,
	`sincronizado` integer DEFAULT true NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sync_queue` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tipo` text NOT NULL,
	`orden_id` integer NOT NULL,
	`imagen_id` text,
	`modo` integer,
	`intentos` integer DEFAULT 0 NOT NULL,
	`ultimo_error` text,
	`created_at` text NOT NULL,
	`last_attempt_at` text
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`usuario_id` integer PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`apellido` text NOT NULL,
	`instalador_id` integer NOT NULL,
	`movil_id` integer NOT NULL,
	`avatar` text,
	`fecha_login` text NOT NULL,
	`password_hash` text,
	`updated_at` text NOT NULL
);
