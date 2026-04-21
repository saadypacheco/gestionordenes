import { fechaHoyStr, mismaFecha } from './fecha';

describe('fechaHoyStr', () => {
  it('matchea YYYY-MM-DD exacto', () => {
    expect(fechaHoyStr()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('longitud 10', () => {
    expect(fechaHoyStr()).toHaveLength(10);
  });
});

describe('mismaFecha', () => {
  it('true cuando las dos fechas son YYYY-MM-DD iguales', () => {
    expect(mismaFecha('2026-04-20', '2026-04-20')).toBe(true);
  });

  it('compara solo los primeros 10 chars (ignora hora)', () => {
    expect(mismaFecha('2026-04-20', '2026-04-20T10:30:00')).toBe(true);
    expect(mismaFecha('2026-04-20T00:00:00', '2026-04-20T23:59:59')).toBe(true);
  });

  it('false para fechas distintas', () => {
    expect(mismaFecha('2026-04-20', '2026-04-21')).toBe(false);
  });

  it('false con null o undefined', () => {
    expect(mismaFecha(null, '2026-04-20')).toBe(false);
    expect(mismaFecha('2026-04-20', undefined)).toBe(false);
    expect(mismaFecha(null, null)).toBe(false);
  });
});
