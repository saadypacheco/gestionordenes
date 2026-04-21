import { EstadoOrden } from '@/config/constants';
import type { Orden, OrdenEquipo, OrdenImagen, OrdenMaterial, OrdenTarea } from '@/domain/orden';
import {
  fromOrdenEquipoRow,
  fromOrdenImagenRow,
  fromOrdenMaterialRow,
  fromOrdenRow,
  fromOrdenTareaRow,
  toOrdenEquipoRow,
  toOrdenImagenRow,
  toOrdenMaterialRow,
  toOrdenRow,
  toOrdenTareaRow,
} from './mappers';

/**
 * Tests de ida-y-vuelta dominio ↔ row. Objetivo: garantizar que guardar y recuperar
 * no pierde información. Si un campo se agrega al modelo y no al mapper, el roundtrip falla.
 */

const FIXED_TS = '2026-04-21T10:00:00.000Z';

const tareaFx: OrdenTarea = { tareaId: 3, descripcion: 'Instalación', cantidad: 1 };
const equipoFx: OrdenEquipo = {
  equipoId: 100,
  nroSerie: '00:1A:2B:3C:4D:5E',
  materialId: 5,
  descripcion: 'Decodificador',
  abonado: false,
  imagen: null,
  imagenId: null,
  mimeType: null,
};
const materialFx: OrdenMaterial = {
  materialId: 7,
  descripcion: 'Cable coaxil',
  cantidad: 30,
  medidaInicial: 0,
  medidaFinal: 30,
  nroSerie: null,
  nroSerieR: null,
  tipoConsumoId: null,
};
const imagenFx: OrdenImagen = {
  ordenId: 1234,
  imagenId: 'uuid-1',
  imagen: null,
  mimeType: 'image/jpeg',
  estadoId: 1,
  subida: false,
  tipo: 'foto',
};

const ordenFx: Orden = {
  ordenId: 1234,
  importacionId: 55,
  clienteId: 'abc',
  cliente: 'Homero Simpson',
  calle: 'Av. Siempreviva',
  numero: '742',
  domicilio: null,
  sector: null,
  fechaInstalacion: '2026-04-20',
  fechaCarga: '2026-04-19',
  comentarios: '',
  estadoId: EstadoOrden.EnCurso,
  estado: 'en_curso',
  movilId: 8,
  instaladorId: 15,
  usuarioId: 42,
  tipoTrabajoId: 1,
  tareas: [tareaFx],
  equipos: [equipoFx],
  recuperos: [],
  materiales: [materialFx],
  imagenes: [imagenFx],
  sincronizado: true,
  iniciadaAt: null,
  cerradaAt: null,
  ubicacion: null,
};

describe('Orden ↔ OrdenRow', () => {
  it('preserva todos los campos en roundtrip', () => {
    const row = toOrdenRow(ordenFx, FIXED_TS);
    const back = fromOrdenRow(row, [tareaFx], [equipoFx], [], [materialFx], [imagenFx]);
    expect(back).toEqual(ordenFx);
  });

  it('numero null se preserva como null', () => {
    const row = toOrdenRow({ ...ordenFx, numero: null }, FIXED_TS);
    expect(row.numero).toBeNull();
  });

  it('estadoId Cerrada=20 sobrevive', () => {
    const row = toOrdenRow({ ...ordenFx, estadoId: EstadoOrden.Cerrada }, FIXED_TS);
    expect(row.estadoId).toBe(20);
    const back = fromOrdenRow(row, [], [], [], [], []);
    expect(back.estadoId).toBe(EstadoOrden.Cerrada);
  });

  it('updatedAt se setea con el timestamp provisto', () => {
    const row = toOrdenRow(ordenFx, FIXED_TS);
    expect(row.updatedAt).toBe(FIXED_TS);
  });
});

describe('OrdenTarea ↔ row', () => {
  it('roundtrip preserva tareaId/descripcion/cantidad', () => {
    const rowPartial = toOrdenTareaRow(1234, tareaFx);
    const back = fromOrdenTareaRow({ id: 1, ...rowPartial });
    expect(back).toEqual(tareaFx);
  });
});

describe('OrdenEquipo ↔ row', () => {
  it('roundtrip tipo=instalado preserva el equipo', () => {
    const rowPartial = toOrdenEquipoRow(1234, equipoFx, 'instalado');
    expect(rowPartial.tipo).toBe('instalado');
    const back = fromOrdenEquipoRow({ id: 1, ...rowPartial });
    expect(back).toEqual(equipoFx);
  });

  it('tipo=recuperado se respeta', () => {
    const rowPartial = toOrdenEquipoRow(1234, equipoFx, 'recuperado');
    expect(rowPartial.tipo).toBe('recuperado');
  });
});

describe('OrdenMaterial ↔ row', () => {
  it('roundtrip preserva medida inicial/final y cantidad', () => {
    const rowPartial = toOrdenMaterialRow(1234, materialFx);
    const back = fromOrdenMaterialRow({ id: 1, ...rowPartial });
    expect(back).toEqual(materialFx);
  });
});

describe('OrdenImagen ↔ row', () => {
  it('roundtrip con base64 null preserva la estructura', () => {
    const rowPartial = toOrdenImagenRow(1234, imagenFx, FIXED_TS);
    expect(rowPartial.tipo).toBe('foto');
    // imagen=null ⇒ subida=false (no vino del backend)
    expect(rowPartial.subida).toBe(false);
    const back = fromOrdenImagenRow({ id: 1, ...rowPartial });
    expect(back.imagenId).toBe(imagenFx.imagenId);
    expect(back.mimeType).toBe(imagenFx.mimeType);
  });

  it('imagen base64 no-null ⇒ subida=true (vino del backend)', () => {
    const withB64: OrdenImagen = { ...imagenFx, imagen: '/9j/4AAQ...', subida: undefined };
    const rowPartial = toOrdenImagenRow(1234, withB64, FIXED_TS);
    expect(rowPartial.subida).toBe(true);
    expect(rowPartial.imagenBase64).toBe('/9j/4AAQ...');
    expect(rowPartial.imagenUri).toBeNull();
  });

  it('imagen file:// ⇒ routea a imagenUri y subida=false (local pendiente)', () => {
    const withLocal: OrdenImagen = {
      ...imagenFx,
      imagen: 'file:///data/user/0/app/ordenes/1234/uuid-1.jpg',
      subida: undefined,
    };
    const rowPartial = toOrdenImagenRow(1234, withLocal, FIXED_TS);
    expect(rowPartial.imagenUri).toBe(
      'file:///data/user/0/app/ordenes/1234/uuid-1.jpg',
    );
    expect(rowPartial.imagenBase64).toBeNull();
    expect(rowPartial.subida).toBe(false);
  });

  it('subida explícita gana al default inferido', () => {
    const withLocalSubida: OrdenImagen = {
      ...imagenFx,
      imagen: 'file:///foo.jpg',
      subida: true, // ya subida aunque sea local
    };
    const rowPartial = toOrdenImagenRow(1234, withLocalSubida, FIXED_TS);
    expect(rowPartial.subida).toBe(true);
    expect(rowPartial.imagenUri).toBe('file:///foo.jpg');
  });

  it('fromOrdenImagenRow prefiere imagenUri sobre imagenBase64', () => {
    const back = fromOrdenImagenRow({
      id: 1,
      ordenId: 1234,
      imagenId: 'uuid-2',
      imagenUri: 'file:///local.jpg',
      imagenBase64: '/9j/4AAQ...',
      mimeType: 'image/jpeg',
      estadoId: null,
      tipo: 'foto',
      subida: true,
      createdAt: FIXED_TS,
    });
    expect(back.imagen).toBe('file:///local.jpg');
    expect(back.subida).toBe(true);
  });

  it('tipo=firma se preserva en roundtrip', () => {
    const firma: OrdenImagen = {
      ...imagenFx,
      imagen: 'file:///firma.jpg',
      tipo: 'firma',
      subida: undefined,
    };
    const row = toOrdenImagenRow(1234, firma, FIXED_TS);
    expect(row.tipo).toBe('firma');
    const back = fromOrdenImagenRow({ id: 1, ...row });
    expect(back.tipo).toBe('firma');
  });
});
