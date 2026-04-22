import { estaListo, proximoReintentoEn } from './backoff';

describe('proximoReintentoEn', () => {
  it('0 intentos ⇒ 0ms (primer envío)', () => {
    expect(proximoReintentoEn(0)).toBe(0);
  });

  it('1 intento ⇒ 30s', () => {
    expect(proximoReintentoEn(1)).toBe(30_000);
  });

  it('exponencial base 30s', () => {
    expect(proximoReintentoEn(2)).toBe(60_000);
    expect(proximoReintentoEn(3)).toBe(120_000);
    expect(proximoReintentoEn(4)).toBe(240_000);
  });

  it('cap a 10 minutos', () => {
    expect(proximoReintentoEn(10)).toBe(10 * 60_000);
    expect(proximoReintentoEn(100)).toBe(10 * 60_000);
  });

  it('negativo ⇒ 0', () => {
    expect(proximoReintentoEn(-1)).toBe(0);
  });
});

describe('estaListo', () => {
  const ahora = new Date('2026-04-21T12:00:00Z');

  it('intentos=0 siempre listo', () => {
    expect(estaListo(0, null, ahora)).toBe(true);
    expect(estaListo(0, '2026-04-21T11:59:00Z', ahora)).toBe(true);
  });

  it('intentos>0 pero sin lastAttemptAt ⇒ listo (safety)', () => {
    expect(estaListo(3, null, ahora)).toBe(true);
  });

  it('intentos=1 listo después de 30s', () => {
    expect(estaListo(1, '2026-04-21T11:59:45Z', ahora)).toBe(false); // 15s
    expect(estaListo(1, '2026-04-21T11:59:30Z', ahora)).toBe(true); // 30s exacto
    expect(estaListo(1, '2026-04-21T11:58:00Z', ahora)).toBe(true); // 2m
  });

  it('intentos=3 espera 2 minutos', () => {
    expect(estaListo(3, '2026-04-21T11:59:00Z', ahora)).toBe(false); // 1m
    expect(estaListo(3, '2026-04-21T11:58:00Z', ahora)).toBe(true); // 2m
  });

  it('lastAttemptAt inválido ⇒ listo (safety)', () => {
    expect(estaListo(3, 'not-a-date', ahora)).toBe(true);
  });
});
