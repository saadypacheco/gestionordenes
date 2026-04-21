import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from './client';
import migrations from './migrations/migrations';

/**
 * Hook que corre las migraciones pendientes al arrancar la app.
 * Uso típico en `app/_layout.tsx`:
 *
 *   const { success, error } = useMigrations(db, migrations);
 *   if (!success) return <LoadingOrError error={error} />;
 *
 * Se conectará cuando lo integremos al layout (Fase 4+).
 */
export function useDbMigrations() {
  return useMigrations(db, migrations);
}
