/**
 * Tests de regresión sobre los contratos numéricos que vienen del backend legacy.
 * Si alguien renumerara estos valores, la app empezaría a mandarle basura al backend.
 * NO tocar los números sin coordinar con el backend — y si se cambian acá, los tests fallan.
 * Ver docs/backend-endpoints.md.
 */
import {
  EstadoOrden,
  ModoGrabado,
  FOTO_JPEG_QUALITY,
  FOTO_MAX_LADO_PX,
  MAX_FOTOS_POR_ORDEN,
} from './constants';

describe('EstadoOrden (contrato con backend legacy)', () => {
  it('EnCurso === 15', () => {
    expect(EstadoOrden.EnCurso).toBe(15);
  });
  it('Cerrada === 20', () => {
    expect(EstadoOrden.Cerrada).toBe(20);
  });
  it('Anulada === 90', () => {
    expect(EstadoOrden.Anulada).toBe(90);
  });
});

describe('ModoGrabado (contrato con /ordenes/grabarSincronizar)', () => {
  it('Todo === 1', () => {
    expect(ModoGrabado.Todo).toBe(1);
  });
  it('Cabecera === 2', () => {
    expect(ModoGrabado.Cabecera).toBe(2);
  });
  it('Estado === 3', () => {
    expect(ModoGrabado.Estado).toBe(3);
  });
  it('Tareas === 4', () => {
    expect(ModoGrabado.Tareas).toBe(4);
  });
  it('Materiales === 5', () => {
    expect(ModoGrabado.Materiales).toBe(5);
  });
  it('Equipos === 6', () => {
    expect(ModoGrabado.Equipos).toBe(6);
  });
  it('Fotos === 7', () => {
    expect(ModoGrabado.Fotos).toBe(7);
  });
});

describe('Reglas de fotos (AGENTS.md §9 regla 5)', () => {
  it('máximo 5 fotos por orden', () => {
    expect(MAX_FOTOS_POR_ORDEN).toBe(5);
  });
  it('lado mayor = 1600 px', () => {
    expect(FOTO_MAX_LADO_PX).toBe(1600);
  });
  it('JPEG quality = 0.7 (balance calidad/red)', () => {
    expect(FOTO_JPEG_QUALITY).toBe(0.7);
  });
});
