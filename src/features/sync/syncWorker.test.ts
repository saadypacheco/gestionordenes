/* eslint-disable import/first -- jest.mock() debe ir antes de imports */

/**
 * Tests del syncWorker. Mockeamos via factories (evita cargar módulos reales
 * que tocan SQLite, que no está disponible en el jest env).
 */

jest.mock('@/db/repositories/syncQueue', () => ({
  listPending: jest.fn(),
  markAttemptFailed: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('@/db/repositories/ordenes', () => ({
  getOrden: jest.fn(),
  markOrdenSincronizada: jest.fn(),
  markImagenSubida: jest.fn(),
}));
jest.mock('@/api/ordenes', () => ({
  grabarSincronizar: jest.fn(),
}));
jest.mock('@/api/imagenes', () => ({
  subirImagen: jest.fn(),
  borrarImagen: jest.fn(),
}));

import { ModoGrabado } from '@/config/constants';
import { ApiError } from '@/domain/errores';
import type { Orden } from '@/domain/orden';
import type { SyncQueueRow } from '@/db/schema';
import {
  listPending,
  markAttemptFailed,
  removeItem,
} from '@/db/repositories/syncQueue';
import {
  getOrden,
  markImagenSubida,
  markOrdenSincronizada,
} from '@/db/repositories/ordenes';
import { grabarSincronizar } from '@/api/ordenes';
import { borrarImagen, subirImagen } from '@/api/imagenes';

import { run } from './syncWorker';

const listPendingMock = listPending as jest.MockedFunction<typeof listPending>;
const removeItemMock = removeItem as jest.MockedFunction<typeof removeItem>;
const markAttemptFailedMock = markAttemptFailed as jest.MockedFunction<
  typeof markAttemptFailed
>;
const getOrdenMock = getOrden as jest.MockedFunction<typeof getOrden>;
const markOrdenSincronizadaMock = markOrdenSincronizada as jest.MockedFunction<
  typeof markOrdenSincronizada
>;
const markImagenSubidaMock = markImagenSubida as jest.MockedFunction<
  typeof markImagenSubida
>;
const grabarSincronizarMock = grabarSincronizar as jest.MockedFunction<
  typeof grabarSincronizar
>;
const subirImagenMock = subirImagen as jest.MockedFunction<typeof subirImagen>;
const borrarImagenMock = borrarImagen as jest.MockedFunction<typeof borrarImagen>;

const ORDEN_FAKE: Orden = {
  ordenId: 10,
  importacionId: null,
  clienteId: null,
  cliente: '',
  calle: '',
  numero: null,
  domicilio: null,
  sector: null,
  fechaInstalacion: '2026-04-21',
  fechaCarga: null,
  comentarios: '',
  estadoId: 15,
  estado: '',
  movilId: null,
  instaladorId: 1,
  usuarioId: 1,
  tipoTrabajoId: null,
  tareas: [],
  equipos: [],
  recuperos: [],
  materiales: [],
  imagenes: [],
  sincronizado: false,
  iniciadaAt: null,
  cerradaAt: null,
  ubicacion: null,
};

function queueItem(partial: Partial<SyncQueueRow>): SyncQueueRow {
  return {
    id: 1,
    tipo: 'grabar_orden',
    ordenId: 10,
    imagenId: null,
    modo: ModoGrabado.Todo,
    intentos: 0,
    ultimoError: null,
    createdAt: '2026-04-21T10:00:00Z',
    lastAttemptAt: null,
    ...partial,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('syncWorker.run', () => {
  it('cola vacía ⇒ sin side effects', async () => {
    listPendingMock.mockResolvedValue([]);
    const res = await run();
    expect(res.procesados).toBe(0);
    expect(grabarSincronizarMock).not.toHaveBeenCalled();
  });

  it('grabar_orden: llama grabarSincronizar + markOrdenSincronizada + removeItem', async () => {
    listPendingMock.mockResolvedValue([queueItem({ tipo: 'grabar_orden' })]);
    getOrdenMock.mockResolvedValue(ORDEN_FAKE);
    grabarSincronizarMock.mockResolvedValue(undefined);

    const res = await run();

    expect(grabarSincronizarMock).toHaveBeenCalledTimes(1);
    const [ordenArg, pendientes, modoArg] = grabarSincronizarMock.mock.calls[0];
    expect(ordenArg.ordenId).toBe(10);
    expect(ordenArg.imagenes).toEqual([]); // sin binarios
    expect(pendientes).toEqual([]);
    expect(modoArg).toBe(ModoGrabado.Todo);
    expect(markOrdenSincronizadaMock).toHaveBeenCalledWith(10);
    expect(removeItemMock).toHaveBeenCalledWith(1);
    expect(res.procesados).toBe(1);
    expect(res.fallidos).toBe(0);
  });

  it('grabar_orden: orden ausente ⇒ remueve de la cola sin error', async () => {
    listPendingMock.mockResolvedValue([queueItem({ tipo: 'grabar_orden' })]);
    getOrdenMock.mockResolvedValue(null);

    const res = await run();

    expect(grabarSincronizarMock).not.toHaveBeenCalled();
    expect(removeItemMock).toHaveBeenCalledWith(1);
    expect(res.procesados).toBe(1);
  });

  it('grabar_orden: error transitorio ⇒ markAttemptFailed, NO remove', async () => {
    listPendingMock.mockResolvedValue([queueItem({ tipo: 'grabar_orden' })]);
    getOrdenMock.mockResolvedValue(ORDEN_FAKE);
    grabarSincronizarMock.mockRejectedValue(
      new ApiError('network', 'no hay red'),
    );

    const res = await run();

    expect(markAttemptFailedMock).toHaveBeenCalledWith(
      1,
      expect.stringContaining('network'),
    );
    expect(removeItemMock).not.toHaveBeenCalled();
    expect(markOrdenSincronizadaMock).not.toHaveBeenCalled();
    expect(res.fallidos).toBe(1);
    expect(res.errores[0]?.mensaje).toContain('network');
  });

  it('subir_imagen local: llama subirImagen + markImagenSubida', async () => {
    listPendingMock.mockResolvedValue([
      queueItem({ id: 2, tipo: 'subir_imagen', imagenId: 'uuid-1', modo: null }),
    ]);
    getOrdenMock.mockResolvedValue({
      ...ORDEN_FAKE,
      imagenes: [
        {
          ordenId: 10,
          imagenId: 'uuid-1',
          imagen: 'file:///data/app/uuid-1.jpg',
          mimeType: 'image/jpeg',
          estadoId: null,
          subida: false,
          tipo: 'foto',
        },
      ],
    });
    subirImagenMock.mockResolvedValue(undefined);

    const res = await run();

    expect(subirImagenMock).toHaveBeenCalledWith(
      'file:///data/app/uuid-1.jpg',
      10,
      'uuid-1',
    );
    expect(markImagenSubidaMock).toHaveBeenCalledWith('uuid-1');
    expect(removeItemMock).toHaveBeenCalledWith(2);
    expect(res.procesados).toBe(1);
  });

  it('subir_imagen: si la imagen ya no existe localmente, remueve silenciosamente', async () => {
    listPendingMock.mockResolvedValue([
      queueItem({ id: 3, tipo: 'subir_imagen', imagenId: 'missing', modo: null }),
    ]);
    getOrdenMock.mockResolvedValue(ORDEN_FAKE); // imagenes: []

    const res = await run();

    expect(subirImagenMock).not.toHaveBeenCalled();
    expect(removeItemMock).toHaveBeenCalledWith(3);
    expect(res.procesados).toBe(1);
  });

  it('subir_imagen: si la imagen es base64 (no file://), no se reintenta subir', async () => {
    listPendingMock.mockResolvedValue([
      queueItem({ id: 4, tipo: 'subir_imagen', imagenId: 'b64', modo: null }),
    ]);
    getOrdenMock.mockResolvedValue({
      ...ORDEN_FAKE,
      imagenes: [
        {
          ordenId: 10,
          imagenId: 'b64',
          imagen: '/9j/4AAQ...',
          mimeType: 'image/jpeg',
          estadoId: null,
          subida: true,
          tipo: 'foto',
        },
      ],
    });

    await run();

    expect(subirImagenMock).not.toHaveBeenCalled();
    expect(removeItemMock).toHaveBeenCalledWith(4);
  });

  it('borrar_imagen: llama borrarImagen + remove', async () => {
    listPendingMock.mockResolvedValue([
      queueItem({ id: 5, tipo: 'borrar_imagen', imagenId: 'uuid-del', modo: null }),
    ]);
    borrarImagenMock.mockResolvedValue(undefined);

    await run();

    expect(borrarImagenMock).toHaveBeenCalledWith(10, 'uuid-del');
    expect(removeItemMock).toHaveBeenCalledWith(5);
  });

  it('respeta backoff: item con intentos=1 y lastAttemptAt reciente se skipea', async () => {
    const ahora = new Date('2026-04-21T12:00:00Z');
    listPendingMock.mockResolvedValue([
      queueItem({
        id: 6,
        tipo: 'grabar_orden',
        intentos: 1,
        lastAttemptAt: '2026-04-21T11:59:45Z', // 15s antes → backoff 30s
      }),
    ]);

    const res = await run(ahora);

    expect(res.skipped).toBe(1);
    expect(res.procesados).toBe(0);
    expect(grabarSincronizarMock).not.toHaveBeenCalled();
    expect(removeItemMock).not.toHaveBeenCalled();
  });

  it('múltiples items: sigue procesando aunque uno falle', async () => {
    listPendingMock.mockResolvedValue([
      queueItem({ id: 10, tipo: 'grabar_orden' }),
      queueItem({ id: 11, tipo: 'borrar_imagen', imagenId: 'x', modo: null }),
    ]);
    getOrdenMock.mockResolvedValue(ORDEN_FAKE);
    grabarSincronizarMock.mockRejectedValue(new ApiError('http', 'boom', { status: 500 }));
    borrarImagenMock.mockResolvedValue(undefined);

    const res = await run();

    expect(res.fallidos).toBe(1);
    expect(res.procesados).toBe(1);
    expect(borrarImagenMock).toHaveBeenCalled();
    expect(removeItemMock).toHaveBeenCalledWith(11);
    expect(markAttemptFailedMock).toHaveBeenCalledWith(10, expect.any(String));
  });
});
