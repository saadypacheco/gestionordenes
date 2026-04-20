# Backend endpoints

Referencia exhaustiva del backend legacy (`http://alerthor.net:8777/api`).
**Este backend no se modifica.** El cliente absorbe todos los quirks.

Fuente: extraído del código Ionic/Angular en `ordenes20210128/src/app/services/`.

---

## Convenciones y quirks globales

- **Base URL**: `http://alerthor.net:8777/api` (prod según `environment.prod.ts` del legacy).
- **Content-Type**: JSON en request y response salvo `POST /ordenes/guardarImagen` que es `multipart/form-data`.
- **Responses anidadas**: la mayoría devuelven `[[item, item, ...]]` — es decir, hay que desempaquetar con `resp[0]` (y a veces `resp[0][0]` para el primero). El parser del cliente (`src/api/parsers.ts`) centraliza esto.
- **Casing mixto**: los responses traen campos en casing inconsistente. Algunos ejemplos:
  - `Cantidad` vs `cantidad`
  - `Descripcion` vs `descripcion`
  - `materialid` vs `materialId`
  - `MAC` vs `nroSerie`
- **URLs con comillas dobles literales**: `/"2026-04-20"/"2026-04-20"/15` — **sí, con las comillas**. El cliente las incluye al armar la URL.
- **No hay autenticación por token**. Cada request que necesita contexto de usuario recibe el ID directamente en el body o la URL.
- **Errores HTTP**: el backend puede devolver 500 con `error.error` como string descriptivo, o 400 con `error.status` true.

---

## Endpoints

### `POST /usuarios/login`

Login del instalador.

**Request body:**
```json
{
  "xalias": "juanperez",
  "xpass": "1234"
}
```

**Response** (200):
```json
[
  [
    {
      "usuarioId": 42,
      "Nombre": "Juan",
      "Apellido": "Pérez",
      "instaladorId": 15,
      "movilId": 8,
      "avatar": "av-1.png",
      "fecha": "2026-04-20T00:00:00"
    }
  ]
]
```

**Response 200 pero sin usuario válido:**
```json
[[]]
```
→ el cliente trata esto como credenciales inválidas.

**Reglas del cliente:**
- Si `movilId === null` → rechazar login ("no tiene móvil asignado").
- Normalizar `fecha` a `YYYY-MM-DD` (los primeros 10 chars).
- Persistir el usuario en `expo-secure-store` + hash derivado de password para fallback offline.

---

### `GET /ordenes/listarInst/"{fechaDesde}"/"{fechaHasta}"/{instaladorId}`

Órdenes asignadas al instalador en un rango de fechas.

**Path params:**
- `fechaDesde`: string `YYYY-MM-DD` **entre comillas dobles literales**.
- `fechaHasta`: string `YYYY-MM-DD` **entre comillas dobles literales**.
- `instaladorId`: entero.

**Ejemplo de URL real:**
```
/ordenes/listarInst/"2026-04-20"/"2026-04-20"/15
```

**Response** (200): array de órdenes (no anidado, directo).
```json
[
  {
    "ordenId": 1234,
    "importacionId": 55,
    "calle": "Av. Siempreviva",
    "numero": 742,
    "cliente": "Homero Simpson",
    "clienteID": "abc",
    "fechaInstalacion": "2026-04-20T00:00:00",
    "fechaCarga": "2026-04-19T10:00:00",
    "comentarios": "",
    "estadoId": 15,
    "Estado": "en_curso",
    "movilId": 8,
    "instaladorId": 15,
    "usuarioId": 42,
    "tipoTrabajoId": 1,
    "tareas": [{ "tareaId": 3, "Descripcion": "Instalación", "cantidad": 1 }],
    "equipos": [],
    "recuperos": [
      { "materialid": 5, "MAC": "00:1A:2B:3C:4D:5E", "descripcion": "Decodificador" }
    ],
    "materiales": [
      { "materialid": 7, "Cantidad": 30, "Descripcion": "Cable coaxil", "medidaInicial": 0, "medidaFinal": 30 }
    ],
    "imagenes": []
  }
]
```

**Reglas del cliente:**
- `fechaInstalacion` normalizar a `YYYY-MM-DD`.
- `cliente`: si viene como string `"undefined"` → tratar como vacío.
- `materiales[i].Cantidad` → `cantidad`; `materiales[i].materialid` → `materialId`.
- `recuperos[i].MAC` → `nroSerie`; `recuperos[i].materialid` → `materialId`.
- Marcar todas con `sincronizado=true` al guardar local.
- Tras normalizar, persistir en SQLite y mostrar las locales.

---

### `POST /ordenes/sincronizar`

Pushback de órdenes pendientes (sin la orden actual abierta).

**Request body:**
```json
{
  "ordenes": [
    { /* ordenInstalador con sincronizado=false */ }
  ]
}
```

Antes de enviar, el cliente limpia `imagenes: []` de cada orden (las imágenes van por otro endpoint).

**Response** (200): OK sin cuerpo relevante.

---

### `POST /ordenes/grabarSincronizar`

Graba la orden actual + sincroniza el resto de pendientes en un solo round-trip.

**Request body:**
```json
{
  "ordenes": [ /* pendientes, sin la actual, sin imágenes */ ],
  "ordenActual": { /* orden actual completa, sin imágenes en equipos */ },
  "modo": 1
}
```

`modo` es `ModoGrabadoOrden`:

| Valor | Nombre | Uso |
|---|---|---|
| 1 | TODO | Grabado completo (cierre, anulación, cambio general) |
| 2 | CABECERA | Cambio solo en datos de cabecera |
| 3 | ESTADO | Cambio solo de estado |
| 4 | TAREAS | Agregar/quitar tareas |
| 5 | MATERIALES | Cambios en materiales |
| 6 | EQUIPOS | Cambios en equipos |
| 7 | FOTOS | Cambios en galería |

**Response** (200): OK.

**Response** con error parcial:
- `err.error.status == true` → algo del backend rechazó, pero el cliente lo trata como "se sincronizó" (quirk del legacy — revisar).
- Otro error → no sincronizó, reintento pendiente.

**Reglas del cliente:**
- Antes de enviar, limpiar `imagen` de cada equipo (solo mandar metadatos).
- Después del OK, marcar todas las órdenes locales como sincronizadas.

---

### `POST /ordenes/guardarImagen`

Sube una imagen al servidor vía `multipart/form-data`.

**Form fields:**
- `image` (file): el binario JPEG.
- `ordenId` (string): ID de la orden.
- `imagenId` (string): UUID generado por el cliente.

**Response**: OK (sin cuerpo relevante).

**Reglas del cliente:**
- El cliente genera `imagenId` con `expo-crypto.randomUUID()`.
- Antes de subir: resize a 1600 px lado mayor + JPEG quality 70 vía `expo-image-manipulator`.
- Si falla, la imagen queda en la cola de sync para reintento.

---

### `GET /ordenes/imagenesListar/{ordenId}`

Lista imágenes ya subidas para una orden.

**Path params:**
- `ordenId`: entero.

**Response** (200):
```json
[
  [
    {
      "ordenId": 1234,
      "imagenId": "a1b2...uuid",
      "imagen": "<base64-like string>",
      "mimeType": "image/jpeg",
      "estadoId": 1
    }
  ]
]
```

**Reglas del cliente:**
- Desempaquetar `resp[0]`.
- El campo `imagen` del legacy se decodifica con una función custom (`str2ab` en `functions/funciones.ts`) que convierte a `ArrayBuffer`. En RN se usa el equivalente con `atob` o `FileSystem`.

---

### `GET /listas/tareas/`

Catálogo de tareas disponibles.

**Response** (200):
```json
[[
  { "tareaId": 1, "descripcion": "Instalación", "Trabajo": "...", "Rendicion": "...", "tipoTrabajoId": 1, "desccod": "INST" },
  ...
]]
```

Desempaquetar `resp[0]`. Cachear en SQLite en la tabla `cat_tareas`.

---

### `GET /listas/equiposEnDeposito/`

Catálogo de equipos disponibles en depósito para instalar.

**Response** (200): `[[{equipoId, nroSerie, materialId, descripcion, ...}, ...]]`

Desempaquetar `resp[0]`. Cachear en `cat_equipos`.

---

### `GET /listas/materiales/`

Catálogo de materiales disponibles.

**Response** (200): `[[{materialId, descripcion, codigoSap, ...}, ...]]`

Desempaquetar `resp[0]`. Cachear en `cat_materiales`.

---

### `GET /listas/tTrabajo`

Tipos de trabajo.

**Response** (200): `[[{tipoTrabajoId, descripcion}, ...]]`

Desempaquetar `resp[0]`. Cachear en `cat_tipos_trabajo`.

---

## Política de retries y timeouts

- **Timeout por request**: 15 s.
- **Retry**: 2 intentos con backoff exponencial (1 s, 3 s) para 5xx y errores de red.
- **No retry** para 4xx (errores de validación / credenciales).
- **Offline detection**: si la request falla con error de red, no se reintenta inmediatamente. La orden queda en la cola de sync y se reintenta cuando `expo-network` reporta online.

---

## Cambios propuestos al backend (deuda técnica — no en este sprint)

Ninguno en el scope del MVP. Ideas para futuros releases:

1. **HTTPS**: migrar a TLS para eliminar el `usesCleartextTraffic` de Android.
2. **Token auth**: emitir JWT en `/usuarios/login` con TTL razonable + refresh.
3. **Responses normalizados**: devolver objetos directos en lugar de `[[...]]`.
4. **Casing consistente**: unificar en `camelCase` o `snake_case`, no mixed.
5. **Endpoint de dry-run para sync**: poder validar pre-sync sin efectos.
