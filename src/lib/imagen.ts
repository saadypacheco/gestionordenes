import type { OrdenImagen } from '@/domain/orden';

/**
 * Devuelve un URI renderizable por `<Image>` para una imagen de la orden.
 * - `null` si no hay contenido.
 * - Pass-through si ya es `file://`, `http(s)://` o `data:`.
 * - Si es base64 puro, arma el `data:` URI con el mime type (default JPEG).
 *
 * Backend: nos manda base64 con mime opcional.
 * Local (post Fase 6G.2): guardamos path `file://` desde `expo-file-system`.
 */
export function imagenToUri(img: Pick<OrdenImagen, 'imagen' | 'mimeType'>): string | null {
  const raw = img.imagen;
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  if (
    trimmed.startsWith('file://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }
  const mime = img.mimeType ?? 'image/jpeg';
  return `data:${mime};base64,${trimmed}`;
}
