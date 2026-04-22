import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Directory, File, Paths } from 'expo-file-system';
import { FOTO_JPEG_QUALITY, FOTO_MAX_LADO_PX } from '@/config/constants';

/**
 * Pipeline de procesamiento de fotos. Mantiene el side-effect en funciones
 * pequeñas para que el resto sea testeable.
 *
 * 1. `dimensionesResize(w, h, max)` — pura, calcula el tamaño de destino.
 * 2. `rutaLocal(ordenId, imagenId)` — pura, arma el path destino.
 * 3. `procesarYGuardarFoto(sourceUri, ordenId, imagenId)` — side-effect: resize + compresión + move.
 *
 * Política (AGENTS.md §9):
 *  - Lado más largo = `FOTO_MAX_LADO_PX` (1600 px por default)
 *  - JPEG quality = `FOTO_JPEG_QUALITY` (0.7)
 *  - Persisted en `documentDirectory/ordenes/{ordenId}/{imagenId}.jpg`
 */

export type ResizeTarget = { width: number; height: number };

/**
 * Calcula dimensiones de resize manteniendo aspect ratio, con el lado más
 * largo igual a `maxLado`. Nunca escala hacia arriba.
 */
export function dimensionesResize(
  width: number,
  height: number,
  maxLado: number,
): ResizeTarget {
  if (width <= 0 || height <= 0) {
    return { width: maxLado, height: maxLado };
  }
  const maxActual = Math.max(width, height);
  if (maxActual <= maxLado) {
    return { width, height };
  }
  const escala = maxLado / maxActual;
  return {
    width: Math.round(width * escala),
    height: Math.round(height * escala),
  };
}

/** Nombre de archivo estándar para una imagen de orden. */
export function nombreArchivoFoto(imagenId: string): string {
  return `${imagenId}.jpg`;
}

/** Arma el URI `file://` destino. No toca el filesystem. */
export function rutaLocalFoto(ordenId: number, imagenId: string): string {
  const dir = new Directory(Paths.document, 'ordenes', String(ordenId));
  const file = new File(dir, nombreArchivoFoto(imagenId));
  return file.uri;
}

/**
 * Asegura que `documentDirectory/ordenes/{ordenId}/` existe.
 * Es idempotente.
 */
export function asegurarDirOrden(ordenId: number): Directory {
  const dir = new Directory(Paths.document, 'ordenes', String(ordenId));
  if (!dir.exists) {
    dir.create({ intermediates: true });
  }
  return dir;
}

/**
 * Procesa una foto (resize + compresión) y la guarda en el filesystem de la app.
 * Devuelve el URI local persistente.
 *
 * @param sourceUri - URI temporal que devuelve la cámara (puede ser cache)
 * @param ordenId - orden a la que pertenece
 * @param imagenId - UUID generado por el cliente (expo-crypto.randomUUID())
 */
export async function procesarYGuardarFoto(
  sourceUri: string,
  ordenId: number,
  imagenId: string,
): Promise<string> {
  asegurarDirOrden(ordenId);
  const destinoUri = rutaLocalFoto(ordenId, imagenId);

  // Primero manipulamos para obtener las dimensiones reales y aplicar resize.
  // manipulateAsync devuelve un archivo temporal con width/height; si el lado
  // más largo ya está bajo el límite, no resizeamos (ahorra CPU).
  const info = await manipulateAsync(sourceUri, [], {
    format: SaveFormat.JPEG,
    compress: 1,
  });

  const objetivo = dimensionesResize(info.width, info.height, FOTO_MAX_LADO_PX);
  const mismasDimensiones =
    objetivo.width === info.width && objetivo.height === info.height;

  const final = mismasDimensiones
    ? await manipulateAsync(sourceUri, [], {
        format: SaveFormat.JPEG,
        compress: FOTO_JPEG_QUALITY,
      })
    : await manipulateAsync(
        sourceUri,
        [{ resize: { width: objetivo.width, height: objetivo.height } }],
        { format: SaveFormat.JPEG, compress: FOTO_JPEG_QUALITY },
      );

  // Movemos el archivo resultante al path final.
  const source = new File(final.uri);
  const destFile = new File(destinoUri);
  if (destFile.exists) destFile.delete();
  source.move(destFile);

  return destinoUri;
}

/**
 * Borra un archivo de foto del filesystem. No falla si no existe (idempotente).
 */
export function borrarArchivoFoto(ordenId: number, imagenId: string): void {
  const file = new File(rutaLocalFoto(ordenId, imagenId));
  if (file.exists) file.delete();
}
