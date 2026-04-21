import { formatearUbicacion, parsearUbicacion } from './gps';

describe('formatearUbicacion', () => {
  it('usa 6 decimales', () => {
    expect(formatearUbicacion(-34.6037, -58.3816)).toBe('-34.603700,-58.381600');
  });

  it('redondea correctamente', () => {
    expect(formatearUbicacion(-34.60371234, -58.38165678)).toBe('-34.603712,-58.381657');
  });

  it('cero se mantiene', () => {
    expect(formatearUbicacion(0, 0)).toBe('0.000000,0.000000');
  });
});

describe('parsearUbicacion', () => {
  it('parsea formato estándar', () => {
    expect(parsearUbicacion('-34.603700,-58.381600')).toEqual({
      lat: -34.6037,
      lng: -58.3816,
    });
  });

  it('tolera whitespace', () => {
    expect(parsearUbicacion('  -34.6,-58.4  ')).toEqual({ lat: -34.6, lng: -58.4 });
  });

  it('rechaza null/undefined/vacío', () => {
    expect(parsearUbicacion(null)).toBeNull();
    expect(parsearUbicacion(undefined)).toBeNull();
    expect(parsearUbicacion('')).toBeNull();
  });

  it('rechaza formato inválido', () => {
    expect(parsearUbicacion('hola')).toBeNull();
    expect(parsearUbicacion('-34.6')).toBeNull();
    expect(parsearUbicacion('-34.6,-58.4,extra')).toBeNull();
  });

  it('rechaza valores fuera de rango', () => {
    expect(parsearUbicacion('91,0')).toBeNull();
    expect(parsearUbicacion('-91,0')).toBeNull();
    expect(parsearUbicacion('0,181')).toBeNull();
    expect(parsearUbicacion('0,-181')).toBeNull();
  });

  it('acepta los límites exactos', () => {
    expect(parsearUbicacion('90,180')).toEqual({ lat: 90, lng: 180 });
    expect(parsearUbicacion('-90,-180')).toEqual({ lat: -90, lng: -180 });
  });
});
