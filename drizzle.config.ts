import type { Config } from 'drizzle-kit';

/**
 * Config de Drizzle Kit para generar migraciones SQL a partir del schema TS.
 * La DB local vive en SQLite (expo-sqlite) en el device — esto es solo para
 * generar los archivos de migración que la app aplica al arrancar.
 */
export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
