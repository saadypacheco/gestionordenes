import { EstadoOrden } from '@/config/constants';
import { formatoCliente, formatoDireccion, labelEstadoOrden, tituloOrden } from './formato';

describe('labelEstadoOrden', () => {
  it('EnCurso → "En curso" / progress', () => {
    expect(labelEstadoOrden(EstadoOrden.EnCurso)).toEqual({ label: 'En curso', tone: 'progress' });
  });
  it('Cerrada → "Cerrada" / success', () => {
    expect(labelEstadoOrden(EstadoOrden.Cerrada)).toEqual({ label: 'Cerrada', tone: 'success' });
  });
  it('Anulada → "Anulada" / danger', () => {
    expect(labelEstadoOrden(EstadoOrden.Anulada)).toEqual({ label: 'Anulada', tone: 'danger' });
  });
  it('estado desconocido → muted con número', () => {
    const r = labelEstadoOrden(999 as EstadoOrden);
    expect(r.tone).toBe('muted');
    expect(r.label).toContain('999');
  });
});

describe('formatoDireccion', () => {
  it('calle + numero', () => {
    expect(formatoDireccion({ calle: 'Av. Siempreviva', numero: '742' })).toBe(
      'Av. Siempreviva 742',
    );
  });
  it('solo calle', () => {
    expect(formatoDireccion({ calle: 'Av. Corrientes', numero: null })).toBe('Av. Corrientes');
  });
  it('todo vacío → fallback', () => {
    expect(formatoDireccion({ calle: '', numero: null })).toBe('Sin dirección');
  });
  it('numero como string vacío', () => {
    expect(formatoDireccion({ calle: 'San Martín', numero: '' })).toBe('San Martín');
  });
});

describe('formatoCliente', () => {
  it('devuelve el cliente si existe', () => {
    expect(formatoCliente({ cliente: 'Homero' })).toBe('Homero');
  });
  it('trim de espacios', () => {
    expect(formatoCliente({ cliente: '  Marge  ' })).toBe('Marge');
  });
  it('empty string → fallback', () => {
    expect(formatoCliente({ cliente: '' })).toBe('Cliente sin nombre');
  });
});

describe('tituloOrden', () => {
  it('formato "#id · cliente"', () => {
    expect(tituloOrden({ ordenId: 1234, cliente: 'Homero Simpson' })).toBe('#1234 · Homero Simpson');
  });
});
