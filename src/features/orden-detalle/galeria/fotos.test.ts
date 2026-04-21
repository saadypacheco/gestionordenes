import { dimensionesResize, nombreArchivoFoto } from './fotos';

describe('dimensionesResize', () => {
  it('no escala si ya está por debajo del max', () => {
    expect(dimensionesResize(800, 600, 1600)).toEqual({ width: 800, height: 600 });
  });

  it('escala manteniendo ratio cuando width es el lado más grande', () => {
    expect(dimensionesResize(3200, 1600, 1600)).toEqual({ width: 1600, height: 800 });
  });

  it('escala manteniendo ratio cuando height es el lado más grande', () => {
    expect(dimensionesResize(1600, 3200, 1600)).toEqual({ width: 800, height: 1600 });
  });

  it('cuadrada se mantiene cuadrada', () => {
    expect(dimensionesResize(2400, 2400, 1600)).toEqual({ width: 1600, height: 1600 });
  });

  it('valores inválidos (0 o negativos) devuelven cuadrado del max', () => {
    expect(dimensionesResize(0, 100, 1600)).toEqual({ width: 1600, height: 1600 });
    expect(dimensionesResize(100, 0, 1600)).toEqual({ width: 1600, height: 1600 });
    expect(dimensionesResize(-1, -1, 1600)).toEqual({ width: 1600, height: 1600 });
  });

  it('redondea resultados a enteros', () => {
    const r = dimensionesResize(1920, 1081, 1600);
    expect(Number.isInteger(r.width)).toBe(true);
    expect(Number.isInteger(r.height)).toBe(true);
  });
});

describe('nombreArchivoFoto', () => {
  it('devuelve {uuid}.jpg', () => {
    expect(nombreArchivoFoto('abc-123')).toBe('abc-123.jpg');
  });
});
