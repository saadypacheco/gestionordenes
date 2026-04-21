import { EstadoOrden } from '@/config/constants';
import {
  parseEquipoCatalogo,
  parseImagenesList,
  parseMaterialCatalogo,
  parseOrden,
  parseOrdenesList,
  parseTareaCatalogo,
  parseTipoTrabajo,
  parseUsuario,
  unwrap,
  unwrapFirst,
} from './parsers';
import {
  equiposCatalogoResponse,
  imagenesListResponse,
  loginEmptyResponse,
  loginOkResponse,
  loginSinMovilResponse,
  materialesCatalogoResponse,
  ordenesListResponse,
  tareasCatalogoResponse,
  tipoTrabajoResponse,
} from './__fixtures__/responses';
import { isApiError } from '@/domain/errores';

/**
 * Tests del "pacto" con el backend legacy. Si estos fallan, la app deja de
 * leer/escribir bien contra el servidor.
 *
 * NUNCA modificar los fixtures para "pasar" el test. Si el backend cambió,
 * primero validar con el dueño del backend, después actualizar fixture + parser.
 */

describe('unwrap / unwrapFirst', () => {
  it('unwrap desempaca [[...]] al array interno', () => {
    expect(unwrap([['a', 'b']])).toEqual(['a', 'b']);
  });

  it('unwrap acepta array directo [...] cuando el backend no anida', () => {
    expect(unwrap([{ x: 1 }, { x: 2 }])).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it('unwrap tira ApiError parse si no es array', () => {
    try {
      unwrap('no-array' as unknown);
      fail('debería haber tirado');
    } catch (e) {
      expect(isApiError(e)).toBe(true);
    }
  });

  it('unwrapFirst devuelve null si el array interno está vacío', () => {
    expect(unwrapFirst([[]])).toBeNull();
  });

  it('unwrapFirst devuelve el primer elemento', () => {
    expect(unwrapFirst([[{ x: 1 }, { x: 2 }]])).toEqual({ x: 1 });
  });
});

describe('parseUsuario (POST /usuarios/login)', () => {
  it('mapea login OK con normalización de fecha', () => {
    const u = parseUsuario(loginOkResponse);
    expect(u).not.toBeNull();
    expect(u!.usuarioId).toBe(42);
    expect(u!.nombre).toBe('Juan');
    expect(u!.apellido).toBe('Pérez');
    expect(u!.instaladorId).toBe(15);
    expect(u!.movilId).toBe(8);
    expect(u!.fecha).toBe('2026-04-20'); // normalizada (sin hora)
  });

  it('devuelve null cuando el response está vacío ([[]])', () => {
    expect(parseUsuario(loginEmptyResponse)).toBeNull();
  });

  it('preserva movilId null (la app rechaza el login luego)', () => {
    const u = parseUsuario(loginSinMovilResponse);
    expect(u).not.toBeNull();
    // el cliente (auth.ts / useLogin) decide rechazar si movilId es null
    expect(u!.movilId).toBeFalsy();
  });
});

describe('parseOrdenesList (GET /ordenes/listarInst)', () => {
  const ordenes = parseOrdenesList(ordenesListResponse);

  it('parsea la cantidad correcta de órdenes', () => {
    expect(ordenes).toHaveLength(2);
  });

  it('mapea la primera orden completa con todos los nested', () => {
    const o = ordenes[0];
    expect(o.ordenId).toBe(1234);
    expect(o.cliente).toBe('Homero Simpson');
    expect(o.fechaInstalacion).toBe('2026-04-20'); // normalizada
    expect(o.fechaCarga).toBe('2026-04-19'); // normalizada
    expect(o.estadoId).toBe(EstadoOrden.EnCurso);
    expect(o.sincronizado).toBe(true);
  });

  it('normaliza tareas con casing Descripcion → descripcion', () => {
    const tarea = ordenes[0].tareas[0];
    expect(tarea.tareaId).toBe(3);
    expect(tarea.descripcion).toBe('Instalación');
    expect(tarea.cantidad).toBe(1);
  });

  it('normaliza materiales con casing Cantidad/materialid → cantidad/materialId', () => {
    const m = ordenes[0].materiales[0];
    expect(m.materialId).toBe(7);
    expect(m.cantidad).toBe(30);
    expect(m.descripcion).toBe('Cable coaxil');
    expect(m.medidaInicial).toBe(0);
    expect(m.medidaFinal).toBe(30);
  });

  it('normaliza recuperos con casing MAC → nroSerie, materialid → materialId', () => {
    const r = ordenes[0].recuperos[0];
    expect(r.materialId).toBe(5);
    expect(r.nroSerie).toBe('00:1A:2B:3C:4D:5E');
    expect(r.descripcion).toBe('Decodificador');
  });

  it('cliente string "undefined" se interpreta como empty', () => {
    // la segunda orden tiene cliente: "undefined" como string literal
    expect(ordenes[1].cliente).toBe('');
  });

  it('estadoId 20 se mapea al enum Cerrada', () => {
    expect(ordenes[1].estadoId).toBe(EstadoOrden.Cerrada);
  });
});

describe('parseOrden (unitario, sin unwrap)', () => {
  it('tira ApiError parse si no tiene ordenId', () => {
    try {
      parseOrden({});
      fail('debería haber tirado');
    } catch (e) {
      expect(isApiError(e)).toBe(true);
    }
  });

  it('default estadoId a EnCurso si no viene', () => {
    const o = parseOrden({ ordenId: 1, cliente: 'x', calle: 'y', instaladorId: 1, usuarioId: 1 });
    expect(o.estadoId).toBe(EstadoOrden.EnCurso);
  });
});

describe('parseTareaCatalogo (GET /listas/tareas)', () => {
  it('desempaca [[...]] y mapea los campos', () => {
    const tareas = parseTareaCatalogo(tareasCatalogoResponse);
    expect(tareas).toHaveLength(2);
    expect(tareas[0].tareaId).toBe(1);
    expect(tareas[0].descripcion).toBe('Instalación');
    expect(tareas[0].trabajo).toBe('Alta');
    expect(tareas[0].desccod).toBe('INST');
  });
});

describe('parseEquipoCatalogo (GET /listas/equiposEnDeposito)', () => {
  it('soporta casing mixto entre items (equipoid+MAC+materialid VS equipoId+nroSerie+materialId)', () => {
    const equipos = parseEquipoCatalogo(equiposCatalogoResponse);
    expect(equipos).toHaveLength(2);
    expect(equipos[0].equipoId).toBe(100);
    expect(equipos[0].nroSerie).toBe('AA:BB:CC:DD:EE:01');
    expect(equipos[0].materialId).toBe(5);
    expect(equipos[1].equipoId).toBe(101);
    expect(equipos[1].nroSerie).toBe('SN-00001');
    expect(equipos[1].materialId).toBe(7);
  });

  it('parsea boolean abonado desde 1/0/true/false', () => {
    const equipos = parseEquipoCatalogo(equiposCatalogoResponse);
    expect(equipos[0].abonado).toBe(false);
    expect(equipos[1].abonado).toBe(true); // venía como 1
  });
});

describe('parseMaterialCatalogo (GET /listas/materiales)', () => {
  it('soporta casing mixto Descripcion/descripcion y materialid/materialId', () => {
    const mats = parseMaterialCatalogo(materialesCatalogoResponse);
    expect(mats).toHaveLength(2);
    expect(mats[0].materialId).toBe(5);
    expect(mats[0].descripcion).toBe('Decodificador HD');
    expect(mats[1].materialId).toBe(7);
    expect(mats[1].descripcion).toBe('Cable coaxil');
  });
});

describe('parseTipoTrabajo (GET /listas/tTrabajo)', () => {
  it('mapea la lista completa', () => {
    const tipos = parseTipoTrabajo(tipoTrabajoResponse);
    expect(tipos).toHaveLength(2);
    expect(tipos[0]).toEqual({ tipoTrabajoId: 1, descripcion: 'Alta de servicio' });
  });
});

describe('parseImagenesList (GET /ordenes/imagenesListar/:id)', () => {
  it('desempaca y devuelve imágenes con base64 + mime', () => {
    const imgs = parseImagenesList(imagenesListResponse);
    expect(imgs).toHaveLength(1);
    expect(imgs[0].ordenId).toBe(1234);
    expect(imgs[0].imagenId).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    expect(imgs[0].mimeType).toBe('image/jpeg');
    expect(imgs[0].imagen).toMatch(/^\/9j\//);
  });
});
