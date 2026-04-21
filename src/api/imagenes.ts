import type { OrdenImagen } from '@/domain/orden';
import { apiGet, apiPostMultipart } from './client';
import { parseImagenesList } from './parsers';

/**
 * GET /ordenes/imagenesListar/{ordenId} — imágenes ya subidas (base64 + mimeType).
 */
export async function listarImagenes(ordenId: number): Promise<OrdenImagen[]> {
  const raw = await apiGet<unknown>(`/ordenes/imagenesListar/${ordenId}`);
  return parseImagenesList(raw);
}

/**
 * POST /ordenes/guardarImagen — upload multipart.
 *
 * Params:
 *  - imageUri: URI local del archivo comprimido (ya pasado por expo-image-manipulator:
 *    max 1600px lado mayor, JPEG quality 0.7, ver AGENTS.md §9 regla 5).
 *  - ordenId: id de la orden destino.
 *  - imagenId: UUID generado con expo-crypto.randomUUID() antes de llamar.
 *
 * No reintenta automáticamente (subir dos veces podría crear duplicados en backend).
 * El caller (Fase 7/8) es responsable de decidir el retry.
 */
export async function subirImagen(
  imageUri: string,
  ordenId: number,
  imagenId: string,
): Promise<void> {
  const form = new FormData();
  // RN/Expo acepta este shape para FormData de archivos locales — no está en los
  // tipos estándar de DOM FormData, por eso el cast.
  form.append(
    'image',
    { uri: imageUri, name: `${imagenId}.jpg`, type: 'image/jpeg' } as unknown as Blob,
  );
  form.append('ordenId', String(ordenId));
  form.append('imagenId', imagenId);

  await apiPostMultipart<unknown>('/ordenes/guardarImagen', form);
}
