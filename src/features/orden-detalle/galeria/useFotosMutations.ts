import { useCallback, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import type { OrdenImagen } from '@/domain/orden';
import { MAX_FOTOS_POR_ORDEN } from '@/config/constants';
import { saveOrden, removeImagenLocal } from '@/db/repositories/ordenes';
import { enqueueSubirImagen } from '@/db/repositories/syncQueue';
import { useOrdenContext } from '../OrdenContext';
import { borrarArchivoFoto, procesarYGuardarFoto } from './fotos';

/**
 * Mutations de galería para una orden:
 *  - `agregar(sourceUri)`: procesa foto (resize + JPEG 70), guarda en
 *    documentDirectory/ordenes/{ordenId}/{uuid}.jpg, inserta en DB con
 *    `subida=false` y encola `subir_imagen` en sync_queue.
 *  - `quitar(imagen)`: sólo permitido si `subida === false` (las ya subidas
 *    son inmutables hasta que el backend soporte borrado — ver AGENTS.md §12).
 *
 * El UUID se genera con `expo-crypto.randomUUID()` para mantener consistencia
 * con el backend, que usa el mismo id en `guardarImagen`.
 */

type Estado = {
  saving: boolean;
  error: string | null;
};

export function useFotosMutations() {
  const { orden, reload } = useOrdenContext();
  const [estado, setEstado] = useState<Estado>({ saving: false, error: null });

  const llenasPorTope = (orden?.imagenes.length ?? 0) >= MAX_FOTOS_POR_ORDEN;

  const agregar = useCallback(
    async (sourceUri: string): Promise<{ tope: boolean }> => {
      if (!orden) return { tope: false };
      if (orden.imagenes.length >= MAX_FOTOS_POR_ORDEN) {
        return { tope: true };
      }

      setEstado({ saving: true, error: null });
      const imagenId = randomUUID();
      try {
        const uriPersistente = await procesarYGuardarFoto(
          sourceUri,
          orden.ordenId,
          imagenId,
        );

        const nueva: OrdenImagen = {
          ordenId: orden.ordenId,
          imagenId,
          imagen: uriPersistente,
          mimeType: 'image/jpeg',
          estadoId: null,
          subida: false,
        };

        await saveOrden({
          ...orden,
          imagenes: [...orden.imagenes, nueva],
          sincronizado: false,
        });
        await enqueueSubirImagen(orden.ordenId, imagenId);
        await reload();
        return { tope: false };
      } catch (e) {
        // Rollback best-effort: borrar el archivo si quedó huérfano
        try {
          borrarArchivoFoto(orden.ordenId, imagenId);
        } catch {
          /* ignore */
        }
        const msg = e instanceof Error ? e.message : 'No se pudo guardar la foto';
        setEstado({ saving: false, error: msg });
        throw e;
      } finally {
        setEstado((s) => ({ ...s, saving: false }));
      }
    },
    [orden, reload],
  );

  const quitar = useCallback(
    async (imagen: OrdenImagen): Promise<{ bloqueada: boolean }> => {
      if (!orden) return { bloqueada: false };
      // Solo se pueden quitar fotos locales que todavía no se subieron.
      if (imagen.subida === true) return { bloqueada: true };
      setEstado({ saving: true, error: null });
      try {
        await removeImagenLocal(orden.ordenId, imagen.imagenId);
        // Borramos el archivo local si es nuestro (file://)
        if (imagen.imagen?.startsWith('file://')) {
          try {
            borrarArchivoFoto(orden.ordenId, imagen.imagenId);
          } catch {
            /* si falla el fs, no bloquea — queda archivo huérfano */
          }
        }
        await reload();
        return { bloqueada: false };
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'No se pudo quitar la foto';
        setEstado({ saving: false, error: msg });
        throw e;
      } finally {
        setEstado((s) => ({ ...s, saving: false }));
      }
    },
    [orden, reload],
  );

  return {
    agregar,
    quitar,
    saving: estado.saving,
    error: estado.error,
    llenasPorTope,
    totalFotos: orden?.imagenes.length ?? 0,
  };
}
