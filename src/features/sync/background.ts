import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { SYNC_BACKGROUND_INTERVAL_MIN } from '@/config/constants';
import { run } from './syncWorker';

/**
 * Registro del task de background para sincronización.
 *
 * iOS es conservador: el sistema decide *cuándo* correr el task;
 * `setMinimumIntervalAsync` es un piso, no una garantía.
 * Android corre el task con más frecuencia (WorkManager), pero sigue sujeto
 * a Doze mode y battery optimization del OEM.
 *
 * La registración es idempotente — se puede llamar varias veces sin duplicar.
 */

export const SYNC_TASK = 'gestion-ordenes/sync';

/** Registra el task handler. Debe llamarse en top-level (antes del render). */
export function defineSyncTask(): void {
  if (!TaskManager.isTaskDefined(SYNC_TASK)) {
    TaskManager.defineTask(SYNC_TASK, async () => {
      try {
        const res = await run();
        return res.procesados > 0
          ? BackgroundFetch.BackgroundFetchResult.NewData
          : BackgroundFetch.BackgroundFetchResult.NoData;
      } catch {
        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
  }
}

/** Activa el background fetch. Idempotente. */
export async function registerBackgroundSync(): Promise<void> {
  const status = await BackgroundFetch.getStatusAsync();
  if (status === BackgroundFetch.BackgroundFetchStatus.Denied) return;

  const yaRegistrado = await TaskManager.isTaskRegisteredAsync(SYNC_TASK);
  if (!yaRegistrado) {
    await BackgroundFetch.registerTaskAsync(SYNC_TASK, {
      minimumInterval: SYNC_BACKGROUND_INTERVAL_MIN * 60,
      stopOnTerminate: false, // Android: sigue vivo tras cerrar la app
      startOnBoot: true, // Android: reanuda tras reinicio del dispositivo
    });
  }
}

/** Opcional: quita el task (útil si el usuario logout). */
export async function unregisterBackgroundSync(): Promise<void> {
  const yaRegistrado = await TaskManager.isTaskRegisteredAsync(SYNC_TASK);
  if (yaRegistrado) {
    await BackgroundFetch.unregisterTaskAsync(SYNC_TASK);
  }
}
