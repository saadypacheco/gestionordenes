import { EstadoOrden } from '@/config/constants';
import type { Orden } from '@/domain/orden';

/**
 * Helpers de display para Ordenes. Funciones puras, testeables.
 */

export type EstadoLabel = {
  /** Texto corto para el badge. */
  label: string;
  /** Key de token de color de la paleta (`state-*` en tailwind.config.js). */
  tone: 'progress' | 'success' | 'danger' | 'muted';
};

export function labelEstadoOrden(estadoId: EstadoOrden): EstadoLabel {
  switch (estadoId) {
    case EstadoOrden.EnCurso:
      return { label: 'En curso', tone: 'progress' };
    case EstadoOrden.Cerrada:
      return { label: 'Cerrada', tone: 'success' };
    case EstadoOrden.Anulada:
      return { label: 'Anulada', tone: 'danger' };
    default:
      return { label: `Estado ${estadoId as number}`, tone: 'muted' };
  }
}

/** Texto de dirección "calle número" — maneja números null/vacíos. */
export function formatoDireccion(orden: Pick<Orden, 'calle' | 'numero'>): string {
  const calle = (orden.calle ?? '').trim();
  const numero = (orden.numero ?? '').toString().trim();
  if (calle && numero) return `${calle} ${numero}`;
  return calle || numero || 'Sin dirección';
}

/** Nombre corto del cliente o fallback. */
export function formatoCliente(orden: Pick<Orden, 'cliente'>): string {
  const c = (orden.cliente ?? '').trim();
  return c || 'Cliente sin nombre';
}

/** Título compacto de la orden — ej: "#1234 · Homero Simpson". */
export function tituloOrden(orden: Pick<Orden, 'ordenId' | 'cliente'>): string {
  return `#${orden.ordenId} · ${formatoCliente(orden)}`;
}
