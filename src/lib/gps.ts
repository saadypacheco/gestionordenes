import * as Location from 'expo-location';
import { GPS_TIMEOUT_MS } from '@/config/constants';

/**
 * Obtiene la posición actual del dispositivo. Devuelve `null` si:
 *  - el usuario no concede permisos
 *  - el timeout se dispara
 *  - el hardware falla / GPS no disponible
 *
 * Formato del string devuelto: `"lat,lng"` (6 decimales) — compatible con la
 * columna `ubicacion` del backend legacy (texto libre). Ver AGENTS.md §9.
 */

export type UbicacionResult =
  | { ok: true; ubicacion: string; lat: number; lng: number; accuracy: number | null }
  | { ok: false; reason: 'permiso' | 'timeout' | 'error'; mensaje: string };

/** Redondea a 6 decimales (≈ 11 cm de precisión — más que suficiente). */
export function formatearUbicacion(lat: number, lng: number): string {
  return `${lat.toFixed(6)},${lng.toFixed(6)}`;
}

/** Parsea `"lat,lng"` → `{ lat, lng }` o `null` si el formato no matchea. */
export function parsearUbicacion(s: string | null | undefined): { lat: number; lng: number } | null {
  if (!s) return null;
  const m = /^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/.exec(s.trim());
  if (!m) return null;
  const lat = Number(m[1]);
  const lng = Number(m[2]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export async function obtenerUbicacion(): Promise<UbicacionResult> {
  // Permiso
  const permiso = await Location.requestForegroundPermissionsAsync();
  if (permiso.status !== 'granted') {
    return { ok: false, reason: 'permiso', mensaje: 'Sin permiso de ubicación' };
  }

  // Carrera entre getCurrent y timeout manual (Location.getCurrentPositionAsync
  // no expone un timeout propio suficientemente corto).
  try {
    const posicion = await Promise.race<Location.LocationObject | null>([
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), GPS_TIMEOUT_MS)),
    ]);

    if (!posicion) {
      return { ok: false, reason: 'timeout', mensaje: 'El GPS tardó más de lo esperado' };
    }

    const { latitude, longitude, accuracy } = posicion.coords;
    return {
      ok: true,
      ubicacion: formatearUbicacion(latitude, longitude),
      lat: latitude,
      lng: longitude,
      accuracy,
    };
  } catch (e) {
    return {
      ok: false,
      reason: 'error',
      mensaje: e instanceof Error ? e.message : 'Error desconocido al leer GPS',
    };
  }
}
