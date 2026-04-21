import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from './schema';

/**
 * Cliente Drizzle sobre expo-sqlite.
 * La DB física vive en `${documentDirectory}/SQLite/gestion-ordenes.db`.
 *
 * Se abre lazy en el primer import. El archivo se crea la primera vez que
 * corre una migración (ver `migrate.ts`).
 */

const DB_NAME = 'gestion-ordenes.db';

const sqlite = SQLite.openDatabaseSync(DB_NAME, {
  // useNewConnection: false → reutiliza la conexión si ya existe (default OK)
  enableChangeListener: true, // habilita `useLiveQuery` de Drizzle para reactividad en UI
});

export const db = drizzle(sqlite, { schema, logger: false });

export type DB = typeof db;
