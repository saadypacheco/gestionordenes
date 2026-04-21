/**
 * Fixtures de respuestas reales (o representativas) del backend legacy.
 * Se extraen del código de `ordenes20210128/src/app/services/*` y de
 * docs/backend-endpoints.md.
 *
 * IMPORTANTE: estos objetos reproducen los quirks del backend (casing mixto,
 * responses anidadas, `cliente: "undefined"` como string, etc.). Si uno se
 * "corrige" sin que el backend cambie, los parsers van a dejar de matchear.
 */

/** POST /usuarios/login — response típica: `[[{usuario}]]`. */
export const loginOkResponse = [
  [
    {
      usuarioId: 42,
      Nombre: 'Juan',
      Apellido: 'Pérez',
      instaladorId: 15,
      movilId: 8,
      descripcion: 'instalador senior',
      avatar: 'av-1.png',
      fecha: '2026-04-20T00:00:00',
    },
  ],
];

/** Login sin match (usuario o pass inválido): `[[]]`. */
export const loginEmptyResponse = [[]];

/** Login donde falta movilId — se debe rechazar en el cliente. */
export const loginSinMovilResponse = [
  [
    {
      usuarioId: 42,
      Nombre: 'Juan',
      Apellido: 'Pérez',
      instaladorId: 15,
      movilId: null,
      fecha: '2026-04-20T00:00:00',
    },
  ],
];

/** GET /ordenes/listarInst/... — response array DIRECTO (no anidado). */
export const ordenesListResponse = [
  {
    ordenId: 1234,
    importacionId: 55,
    calle: 'Av. Siempreviva',
    numero: 742,
    cliente: 'Homero Simpson',
    clienteID: 'abc',
    fechaInstalacion: '2026-04-20T00:00:00',
    fechaCarga: '2026-04-19T10:00:00',
    comentarios: '',
    estadoId: 15,
    Estado: 'en_curso',
    movilId: 8,
    instaladorId: 15,
    usuarioId: 42,
    tipoTrabajoId: 1,
    tareas: [
      { tareaId: 3, Descripcion: 'Instalación', cantidad: 1 },
    ],
    equipos: [],
    recuperos: [
      { materialid: 5, MAC: '00:1A:2B:3C:4D:5E', descripcion: 'Decodificador' },
    ],
    materiales: [
      {
        materialid: 7,
        Cantidad: 30,
        Descripcion: 'Cable coaxil',
        medidaInicial: 0,
        medidaFinal: 30,
      },
    ],
    imagenes: [],
  },
  {
    // quirk: cliente viene como el STRING "undefined"
    ordenId: 1235,
    calle: 'Calle Falsa',
    numero: 123,
    cliente: 'undefined',
    clienteID: 'def',
    fechaInstalacion: '2026-04-20T00:00:00',
    estadoId: 20,
    Estado: 'cerrada',
    instaladorId: 15,
    usuarioId: 42,
    tareas: [],
    equipos: [],
    recuperos: [],
    materiales: [],
    imagenes: [],
  },
];

/** GET /listas/tareas/ — anidado `[[...]]`. */
export const tareasCatalogoResponse = [
  [
    { tareaId: 1, descripcion: 'Instalación', Trabajo: 'Alta', Rendicion: 'INST', tipoTrabajoId: 1, tareaRendicionId: 10, desccod: 'INST' },
    { tareaId: 2, descripcion: 'Retiro', Trabajo: 'Baja', Rendicion: 'RET', tipoTrabajoId: 2, tareaRendicionId: 11, desccod: 'RET' },
  ],
];

/** GET /listas/equiposEnDeposito/ — anidado `[[...]]`. */
export const equiposCatalogoResponse = [
  [
    { equipoid: 100, MAC: 'AA:BB:CC:DD:EE:01', materialid: 5, descripcion: 'Decodificador HD', abonado: false },
    { equipoId: 101, nroSerie: 'SN-00001', materialId: 7, descripcion: 'Router', abonado: 1 },
  ],
];

/** GET /listas/materiales/ — anidado `[[...]]`. */
export const materialesCatalogoResponse = [
  [
    { materialid: 5, Descripcion: 'Decodificador HD', codigoSap: 1000 },
    { materialId: 7, descripcion: 'Cable coaxil', codigoSap: 2000 },
  ],
];

/** GET /listas/tTrabajo — anidado `[[...]]`. */
export const tipoTrabajoResponse = [
  [
    { tipoTrabajoId: 1, descripcion: 'Alta de servicio' },
    { tipoTrabajoId: 2, descripcion: 'Baja de servicio' },
  ],
];

/** GET /ordenes/imagenesListar/{id} — anidado `[[...]]` con base64. */
export const imagenesListResponse = [
  [
    {
      ordenId: 1234,
      imagenId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      imagen: '/9j/4AAQSkZJRg...',
      mimeType: 'image/jpeg',
      estadoId: 1,
    },
  ],
];
