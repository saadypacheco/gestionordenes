import { fechaDisplay, fechaHoraDisplay, fechaHoyStr, mismaFecha } from './fecha';

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

describe('fechaDisplay', () => {
  it('formatea YYYY-MM-DD a DD/MM/YYYY', () => {
    expect(fechaDisplay('2026-04-20')).toBe('20/04/2026');
  });

  it('acepta YYYY-MM-DDTHH:mm:ss y se queda con la fecha', () => {
    expect(fechaDisplay('2026-04-20T10:30:00')).toBe('20/04/2026');
  });

  it('devuelve "—" para null/undefined/vacio', () => {
    expect(fechaDisplay(null)).toBe('—');
    expect(fechaDisplay(undefined)).toBe('—');
    expect(fechaDisplay('')).toBe('—');
  });

  it('devuelve el string original si no matchea', () => {
    expect(fechaDisplay('no-es-fecha')).toBe('no-es-fecha');
  });
});

describe('fechaHoraDisplay', () => {
  it('formatea timestamp ISO a DD/MM/YYYY HH:mm', () => {
    expect(fechaHoraDisplay('2026-04-20T10:30:45')).toBe('20/04/2026 10:30');
  });

  it('acepta separador de espacio', () => {
    expect(fechaHoraDisplay('2026-04-20 10:30:45')).toBe('20/04/2026 10:30');
  });

  it('devuelve "—" para null/undefined/vacio', () => {
    expect(fechaHoraDisplay(null)).toBe('—');
    expect(fechaHoraDisplay(undefined)).toBe('—');
    expect(fechaHoraDisplay('')).toBe('—');
  });

  it('devuelve el string original si no matchea', () => {
    expect(fechaHoraDisplay('2026-04-20')).toBe('2026-04-20');
  });
});
