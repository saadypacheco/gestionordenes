# AGENTS.md — Gestión de Órdenes (App para Instaladores)

> Proyecto de migración del legacy `ordenes20210128/` (Ionic 4 + Angular 9 + Cordova, 2021)
> a **React Native + Expo + TypeScript**. El backend NO se toca — se consume tal cual está.
> Repo destino: https://github.com/saadypacheco/gestionordenes
> Última modificación: 2026-04-20 — decisiones clave cerradas (ver §4 y `docs/decisiones.md`), listo para scaffold.

---

## 1. Visión del proyecto

App mobile para **instaladores de campo** que reciben órdenes de trabajo diarias
(instalaciones de servicios — TV/Internet/cable, según el dominio del legacy) y cargan
en el momento: tareas realizadas, equipos instalados, equipos recuperados, materiales
usados, comentarios y fotos del trabajo.

**Característica crítica:** el instalador trabaja **8+ horas en el campo**, muchas veces
sin señal. La app funciona **offline-first** y sincroniza cuando vuelve la red.

**Audiencia:** técnicos instaladores. Uso en celulares Android de gama media/baja,
una sola mano mientras están arriba de un poste o dentro de una caja de acometida.

**Métricas clave:**
- % de órdenes del día cargadas y cerradas sin intervención manual.
- Tiempo medio de carga de una orden (tareas + fotos + cierre).

**Objetivos de la migración:**
1. Modernizar el stack (Ionic/Cordova → RN/Expo).
2. Modernizar el diseño sin romper el modelo mental del instalador actual.
3. Mantener toda la funcionalidad actual.
4. Optimizar: arranque más rápido, menos crashes, sync más confiable, menor uso de batería.

---

## 2. Contexto: qué hace el legacy

Código en `ordenes20210128/` (NO se migra línea a línea — se migra el **comportamiento**).

### Stack legacy

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Frontend | Ionic 4 + Angular 9 + Cordova | Obsoleto |
| Storage local | `@ionic/storage` sobre SQLite (Cordova) | Reemplazar |
| Backend | `http://alerthor.net:8777/api` | **Intocable** |

### Flujos del legacy (referencia de negocio)

1. **Login** con `xalias` + `xpass` → `/usuarios/login`. Guarda usuario + instaladorId + movilId.
   Fallback offline: si no hay red, valida contra el último login **del mismo día**.
2. **Lista de órdenes del día** (`tab1`): trae `/ordenes/listarInst/{desde}/{hasta}/{instaladorId}`,
   cachea en local. Si no hay red, muestra las locales.
3. **Detalle de orden** (`orden-form`) con 7 tabs:
   - **Tareas** — agregar/quitar tareas desde un catálogo
   - **Equipos** — equipos instalados (con nro de serie vía barcode)
   - **Recuperos** — equipos retirados del domicilio
   - **Materiales** — consumos con medida inicial/final, cantidad
   - **Comentarios** — texto libre
   - **Datos** — cabecera editable (calle, número, cliente)
   - **Galería** — hasta 5 fotos con cámara del equipo
4. **Cerrar** (estadoId=20) o **Anular** (estadoId=90). Estado 15 = en curso.
5. **Sincronizar** (tab visible sólo si hay pendientes): pushback al backend y marca sincronizado.
6. **Upload de imagen**: multipart a `/ordenes/guardarImagen` con `ordenId` + `imagenId` (UUID).

### Endpoints del backend existente

| Método | Path | Para qué |
|--------|------|----------|
| POST | `/usuarios/login` | Login `{xalias, xpass}` → usuario + instaladorId + movilId |
| GET | `/ordenes/listarInst/"{desde}"/"{hasta}"/{instaladorId}` | Órdenes asignadas en el rango |
| POST | `/ordenes/sincronizar` | `{ordenes: [...]}` — pushback de pendientes |
| POST | `/ordenes/grabarSincronizar` | `{ordenes, ordenActual, modo}` — orden actual + sincroniza resto |
| POST | `/ordenes/guardarImagen` | multipart `image` + params `ordenId`, `imagenId` |
| GET | `/ordenes/imagenesListar/{ordenId}` | Imágenes de la orden (base64 + mimeType) |
| GET | `/listas/equiposEnDeposito/` | Catálogo de equipos |
| GET | `/listas/materiales/` | Catálogo de materiales |
| GET | `/listas/tareas/` | Catálogo de tareas |
| GET | `/listas/tTrabajo` | Tipos de trabajo |

> ⚠️ **Quirks del backend** (no se corrigen — el cliente absorbe):
> - URLs con comillas dobles literales: `/"2026-04-20"/"2026-04-20"/15`
> - Responses anidadas: `resp[0]` o `resp[0][0]`
> - Casing mixto: `Cantidad`/`cantidad`, `materialid`/`materialId`, `MAC`/`nroSerie`

### Entidades del dominio

- `usuario` — `{ usuarioId, Nombre, Apellido, instaladorId, movilId, avatar, fecha }`
- `ordenInstalador` — cabecera + `tareas[]` + `equipos[]` + `materiales[]` + `recuperos[]` + `imagenes[]` + `sincronizado`
- `ordenItem` — tarea realizada `{ tareaId, Descripcion, cantidad }`
- `ordenItemMaterial` — `{ materialId, medidaInicial, medidaFinal, nroSerie, nroSerieR, tipoConsumoId, cantidad }`
- `equipo` — `{ equipoId, nroSerie, materialId, descripcion, abonado, imagen, mimeType }`
- `imagen` — `{ ordenId, imagenId (UUID), imagen (bytes), mimeType, estadoId }`
- `trabajo`, `tarea`, `material` — catálogos

### Estados de la orden

| estadoId | Significado |
|----------|-------------|
| 15 | En curso (editable) |
| 20 | Cerrada |
| 90 | Anulada |

### Modos de grabado (enum `ModoGrabadoOrden`)

`TODO=1`, `CABECERA=2`, `ESTADO=3`, `TAREAS=4`, `MATERIALES=5`, `EQUIPOS=6`, `FOTOS=7`

---

## 3. Decisión de stack

Se evaluaron Flutter, React Native + Expo, Ionic + Capacitor, Android nativo (Kotlin) y PWA.
Detalle en `docs/decisiones.md` (a crear).

**Decisión final: React Native + Expo + TypeScript.**

Motivos:
- TypeScript y React alinean con los otros 3 proyectos del stack (`betamigos`, `tienda`, `solucionesdentales`).
- Expo EAS Build resuelve firmado y generación de APK sin Android Studio local.
- `expo-camera`, `expo-barcode-scanner`, `expo-sqlite`, `expo-file-system`, `expo-network`, `expo-secure-store`
  cubren 1:1 los plugins Cordova del legacy.
- Expo Router (file-based) da navegación declarativa clara para el mapa de 9 pantallas del legacy.
- Performance suficiente en Android gama baja (Hermes + New Architecture).

Descartados:
- **Ionic** — pedido expreso del usuario.
- **PWA** — cámara/scanner/offline en navegador no cubren el caso de uso real.
- **Flutter** — mejor perf pura, pero rompe coherencia TS con los otros repos.
- **Kotlin nativo** — overkill para el scope actual; sólo si aparece integración nativa compleja (RFID, impresora térmica, Bluetooth industrial).

---

## 4. Stack propuesto

| Capa | Tecnología | Motivo |
|------|-----------|--------|
| Lenguaje | TypeScript 5.x | — |
| Framework | React Native 0.76+ con Expo SDK 52+ | New Architecture habilitada |
| Engine JS | Hermes | Default en Expo, mejor startup |
| Navegación | **Expo Router** (file-based) | Rutas declarativas, deep links |
| Estado global | **Zustand** (persisted) | Coherente con tus otros proyectos |
| HTTP | **fetch** nativo + wrapper tipado | Sin dependencia extra |
| Cache de queries | **TanStack Query** (opcional — a confirmar) | Retry, invalidación, offline-aware |
| Storage relacional | **expo-sqlite** + **Drizzle ORM** | Type-safe, migraciones, queries declarativas |
| Storage KV simple | `@react-native-async-storage/async-storage` | Sesión, flags |
| Storage seguro | **expo-secure-store** | Credenciales |
| Cámara | **expo-camera** | Control fino + preview |
| Barcode | **expo-barcode-scanner** (integrado en `expo-camera` en SDK 51+) | MLKit |
| Red | **expo-network** + `@react-native-community/netinfo` | Detección online/offline |
| Filesystem | **expo-file-system** | Cache local de imágenes |
| Background tasks | **expo-background-fetch** + **expo-task-manager** | Sync diferido |
| Estilos | **NativeWind 4** (Tailwind en RN) | Misma DX que tus proyectos web |
| UI primitives | **react-native-reusables** (shadcn para RN) | Componentes accesibles modernos |
| Iconos | **lucide-react-native** | Consistente con tus proyectos web |
| Forms | **react-hook-form** + **zod** | Validación declarativa |
| UUID | **expo-crypto** `randomUUID()` | Sin dependencia extra |
| Build | **EAS Build** | APK firmado en la nube |
| OTA Updates | **expo-updates** | Fix hotfixes sin re-release del APK |
| Crash reporting | **Sentry** (a confirmar) | Visibilidad de errores en prod |
| Tests | **Jest** + **@testing-library/react-native** | Unit + integration |

### Plataformas objetivo

| Plataforma | Mínimo soportado | Equivalente comercial | Motivo |
|---|---|---|---|
| Android | API 24 (Android 7.0 Nougat) | celulares desde 2016 | Requerimiento de 10 años de antigüedad, y es el mínimo que soporta Expo SDK 52 |
| iOS | 15.1 | iPhone 6s (2015) y posteriores | Mínimo de Expo SDK 52. Cubre ~10 años. |

### Identificación de la app

| Campo | Valor |
|---|---|
| Nombre comercial | **Gestión de Órdenes** |
| Slug (Expo) | `gestion-ordenes` |
| Android package | `com.gestionordenes.app` |
| iOS bundle ID | `com.gestionordenes.app` |
| Versión inicial | `1.0.0` (semver) + `buildNumber` autoincremental en EAS |

### Paleta de colores (modernización)

Diseño **outdoor-first**: contraste alto, legible bajo sol, sin depender de dark mode (que queda pendiente).

| Token | Hex | Uso |
|---|---|---|
| `brand-primary` | `#1E40AF` (Blue 800) | Headers, botones primarios, tab activa |
| `brand-accent` | `#F59E0B` (Amber 500) | Badges destacados, CTA secundarios |
| `state-success` | `#16A34A` (Green 600) | Orden cerrada, sincronizada OK |
| `state-warning` | `#EA580C` (Orange 600) | Pendiente de sincronizar |
| `state-danger` | `#DC2626` (Red 600) | Errores, orden anulada |
| `state-progress` | `#0891B2` (Cyan 600) | Orden en curso (estadoId=15) |
| `surface-bg` | `#F8FAFC` (Slate 50) | Fondo de pantalla |
| `surface-card` | `#FFFFFF` | Cards, sheets |
| `border` | `#E2E8F0` (Slate 200) | Separadores |
| `text-primary` | `#0F172A` (Slate 900) | Texto principal |
| `text-secondary` | `#475569` (Slate 600) | Subtítulos |
| `text-muted` | `#94A3B8` (Slate 400) | Placeholders, disabled |

Tokens de dark mode quedan **definidos pero no aplicados** en `tailwind.config.js` para no bloquear su implementación futura.

### Iconografía y tipografía

- Iconos: **Lucide** (`lucide-react-native`) — mismo set que usa el resto del stack.
- Tipografía: **Inter** (Variable font vía `@expo-google-fonts/inter`). Tamaños `text-sm / text-base / text-lg` de Tailwind.

> Nada de esto se instala hasta confirmar el scaffold. Cada librería se ratifica al implementar el módulo que la necesita.

---

## 5. Backend — reglas de consumo

1. **Base URL configurable** por entorno: `http://alerthor.net:8777/api` en prod según el legacy.
   Vive en `app.config.ts` vía `extra` + `expo-constants`, o `EXPO_PUBLIC_*` en `.env`.
2. **Mantener los quirks del backend** (comillas en URLs, casing mixto, responses anidadas).
   El cliente **normaliza** en `src/api/parsers.ts` — nunca se pide al backend que cambie.
3. **Toda request tiene timeout** (15s por defecto) y retry configurable en el wrapper.
4. **Errores de red no rompen la UX**: la app sigue funcionando con datos locales.
5. **Nunca guardar la contraseña en plano** en storage. Si el backend no emite token, guardar
   sólo un hash derivado suficiente para validar el fallback offline del día.
   (El legacy guarda `xpass` plano — eso se corrige en la migración.)
6. **Cleartext HTTP**: Android 9+ bloquea HTTP por default. **Decidido**: se declara
   `usesCleartextTraffic: true` acotado al host `alerthor.net` vía `networkSecurityConfig`
   en `app.config.ts`. El resto del tráfico de la app queda obligado a HTTPS.
7. **Auth sin token** (por ahora): se envía `xalias` + `xpass` en el body de `/usuarios/login`
   y se persiste el usuario devuelto. El backend no emite JWT. **Pendiente** para una fase
   posterior: negociar con backend un endpoint con token (ver `docs/decisiones.md`).
8. **Hay un entorno de staging del backend** (confirmado). URL a definir al arrancar —
   se parametriza igual que prod vía `EXPO_PUBLIC_API_URL` por perfil de EAS.

---

## 6. Módulos del frontend

### M1 — Auth
- Login con alias + contraseña → `/usuarios/login`.
- Persistir usuario en `expo-secure-store` (instaladorId, movilId, fecha).
- Fallback offline: login válido si coincide con último login del mismo día.
- Guard en el root layout que redirige a `/login` si no hay sesión válida o no tiene movilId.

### M2 — Listado de órdenes
- Pull de órdenes del día al entrar → `/ordenes/listarInst/...`.
- Persistir en SQLite local (tablas `ordenes`, `orden_tareas`, `orden_equipos`, etc.).
- Pull-to-refresh.
- Banner "sin conexión" si corresponde.
- Badge de sincronización pendiente en el header.

### M3 — Detalle de orden (7 tabs)
Una ruta `/orden/[id]` con 7 sub-rutas (Expo Router):
- **Tareas** — lista + modal para agregar desde catálogo.
- **Equipos** — scanner de barcode para nro de serie + selector desde catálogo.
- **Recuperos** — mismo flujo que equipos, colección distinta.
- **Materiales** — formulario medida inicial/final/cantidad.
- **Comentarios** — textarea.
- **Datos** — formulario cabecera.
- **Galería** — hasta 5 fotos con cámara; upload diferido.

Cualquier cambio marca `sincronizado=false` y persiste en local inmediatamente.
Toolbar con **Cerrar** (estadoId=20) y **Anular** (estadoId=90), habilitados sólo si estadoId=15.

### M4 — Sincronización
- Tab visible si `count(ordenes where sincronizado=false) > 0`.
- Al tocar "Sincronizar" o automáticamente al detectar red con pendientes:
  - `POST /ordenes/grabarSincronizar` con órdenes pendientes.
  - `POST /ordenes/guardarImagen` (multipart) con cada imagen pendiente.
  - Marcar respondidas como sincronizadas.
- Retry en el próximo ciclo si algo falla.
- Background task con `expo-background-fetch` cada N minutos con red disponible.

### M5 — Catálogos (cache)
- `/listas/tareas`, `/listas/equiposEnDeposito`, `/listas/materiales`, `/listas/tTrabajo`
  se cachean en SQLite al inicio y se refrescan en cada pull manual de órdenes.

### M6 — Extensiones de funcionalidad (nuevas vs legacy)

Features nuevas acordadas. Se integran al flujo del detalle de orden (M3) sin cambiar el modelo del backend salvo por el campo `datos_extra` (JSON) donde ya encaja.

- **GPS al cerrar orden**: al tocar "Cerrar", capturar latitud/longitud con `expo-location`
  y enviarlas en el campo `Ubicacion` de la cabecera (el backend ya lo tiene como campo libre).
  Si el usuario no da permisos o no hay fix en 8s, cerrar igual con `Ubicacion` vacío y registrar el motivo en logs.
- **Timestamps reales de inicio/fin**:
  - `iniciada_at` — se setea local al abrir la orden por primera vez (si estadoId=15 y estaba virgen).
  - `cerrada_at` — se setea local al pulsar "Cerrar" / "Anular".
  - Se mandan dentro de `datos_extra` JSON al backend (no rompe contrato existente).
- **Firma del cliente al cerrar**:
  - Nueva pantalla modal previa al cierre con canvas de firma (`react-native-signature-canvas` o equivalente).
  - La firma se guarda como una imagen más en la galería de la orden, con un `tipo='firma'` en metadata local.
  - Se sube por el mismo endpoint `/ordenes/guardarImagen` aprovechando la infraestructura existente.
  - Si el cliente no firma (rechazo), queda registrado en `datos_extra.firma_omitida_motivo` + comentario obligatorio.

---

## 7. Estructura del repo

```
gestionordenes/                           # raíz del repo GitHub
├── AGENTS.md                             # este archivo — visión, stack, módulos, reglas
├── CLAUDE.md                             # reglas de trabajo para Claude Code
├── README.md                             # quickstart humano
├── .gitignore
├── ordenes20210128/                      # LEGACY — sólo referencia, no tocar
├── docs/
│   ├── progreso.md                       # estado: hecho / en progreso / bloqueado
│   ├── decisiones.md                     # por qué se eligió X sobre Y
│   └── backend-endpoints.md              # detalle exhaustivo del backend legacy
├── app/                                  # Expo Router — rutas file-based
│   ├── _layout.tsx                       # root: providers (auth, query, theme)
│   ├── +not-found.tsx
│   ├── login.tsx                         # pantalla de login
│   ├── (tabs)/                           # grupo con tab bar
│   │   ├── _layout.tsx                   # Tab bar: Mis Órdenes / Sincronizar
│   │   ├── index.tsx                     # Lista de órdenes del día (legacy tab1)
│   │   └── sync.tsx                      # Panel de sincronización (legacy tab2)
│   └── orden/
│       └── [id]/
│           ├── _layout.tsx               # tabs internas de la orden
│           ├── index.tsx                 # redirige a tareas
│           ├── tareas.tsx
│           ├── equipos.tsx
│           ├── recuperos.tsx
│           ├── materiales.tsx
│           ├── comentarios.tsx
│           ├── datos.tsx
│           └── galeria.tsx
├── src/
│   ├── api/                              # HTTP client + endpoints tipados
│   │   ├── client.ts                     # wrapper de fetch con timeout/retry
│   │   ├── parsers.ts                    # normaliza responses del backend legacy
│   │   ├── auth.ts                       # POST /usuarios/login
│   │   ├── ordenes.ts                    # GET listarInst, POST grabarSincronizar, etc.
│   │   ├── listas.ts                     # catálogos
│   │   └── imagenes.ts                   # upload multipart
│   ├── db/                               # expo-sqlite + Drizzle
│   │   ├── client.ts                     # abre la DB, corre migraciones
│   │   ├── schema.ts                     # tablas Drizzle
│   │   ├── migrations/                   # archivos .sql generados por drizzle-kit
│   │   └── repositories/
│   │       ├── ordenes.ts                # CRUD + queries de alto nivel
│   │       ├── catalogos.ts
│   │       └── syncQueue.ts              # cola de pendientes
│   ├── domain/                           # tipos de dominio (sin dependencias)
│   │   ├── orden.ts                      # Orden, OrdenItem, etc.
│   │   ├── usuario.ts
│   │   ├── catalogos.ts
│   │   └── enums.ts                      # EstadoOrden, ModoGrabado
│   ├── features/
│   │   ├── auth/
│   │   │   ├── useLogin.ts
│   │   │   ├── useSession.ts
│   │   │   └── components/LoginForm.tsx
│   │   ├── ordenes-list/
│   │   │   ├── useOrdenesDelDia.ts
│   │   │   └── components/OrdenCard.tsx
│   │   ├── orden-detalle/
│   │   │   ├── tareas/
│   │   │   ├── equipos/
│   │   │   ├── recuperos/
│   │   │   ├── materiales/
│   │   │   ├── comentarios/
│   │   │   ├── datos/
│   │   │   └── galeria/
│   │   ├── sync/
│   │   │   ├── useSyncQueue.ts
│   │   │   ├── syncWorker.ts             # background task
│   │   │   └── components/SyncBadge.tsx
│   │   └── barcode/
│   │       └── BarcodeScannerModal.tsx
│   ├── components/                       # UI reutilizable (Button, TextField, Sheet)
│   │   └── ui/
│   ├── hooks/                            # hooks genéricos
│   │   ├── useNetwork.ts
│   │   └── useDebounce.ts
│   ├── lib/                              # utilidades puras
│   │   ├── fecha.ts
│   │   ├── formato.ts
│   │   └── errores.ts
│   ├── stores/                           # Zustand
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   └── config/
│       ├── env.ts                        # lee EXPO_PUBLIC_* / extra
│       ├── theme.ts                      # colores, tipografía
│       └── constants.ts
├── assets/
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── fonts/
├── __tests__/                            # tests a nivel proyecto (integración)
│   └── sync.test.ts
├── package.json
├── app.json                              # config estática de Expo
├── app.config.ts                         # config dinámica (env vars)
├── eas.json                              # perfiles de build (dev, preview, prod)
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js                    # NativeWind
├── drizzle.config.ts
└── .env.example
```

---

## 8. Convenciones de código

### TypeScript / React Native
- Archivos de componentes: `PascalCase.tsx`.
- Archivos de hooks/utilidades: `camelCase.ts`, con prefijo `use` para hooks.
- Archivos de rutas (Expo Router): `kebab-case.tsx` o `index.tsx` / `[id].tsx` — según convención.
- Tipos y interfaces: `PascalCase`. Preferir `type` sobre `interface` salvo herencia.
- Props: tipar con `type Props = {...}` por archivo; no exportar si no se reusa.
- Imports: alias `@/*` para `src/*` (en `tsconfig.json` + `babel.config.js`).
- No lógica de negocio en componentes. Componentes leen hooks; hooks llaman repositorios.

### Estilos (NativeWind)
- Tailwind classes para todo layout y color.
- `className` en vez de `style` salvo animaciones o cálculos.
- Paleta en `tailwind.config.js` con tokens semánticos (`primary`, `surface`, `danger`).

### Base de datos local (Drizzle)
- Tablas: `snake_case` plural (`ordenes`, `orden_tareas`).
- Columnas: `snake_case`.
- Timestamps: `created_at`, `updated_at`, `synced_at`.
- Soft delete: `activo` boolean, nunca `DELETE` físico.

### Git
- Branches: `feature/nombre`, `fix/descripcion`, `chore/tarea`.
- Commits: `feat(módulo): descripción en infinitivo` (mismo estilo que los otros repos del stack).
- PRs con descripción + checklist de validación manual en app.

### Tests
- Tests obligatorios: `api/parsers.ts`, `db/repositories/*`, `features/sync/syncWorker.ts`.
- Snapshot tests de componentes solo donde aporta (no por default).
- E2E queda fuera de scope del MVP (revaluar después).

---

## 9. Reglas críticas

1. **El backend NO se modifica.** Si algo está mal del lado del backend, se arregla en el cliente.
2. **Offline-first**: ningún botón queda deshabilitado por falta de red; todo persiste local y sincroniza después.
3. **Nunca perder trabajo del instalador**: toda edición se graba en SQLite antes de intentar red.
4. **Nunca mostrar datos viejos como frescos**: banner/indicador de última sync.
5. **Fotos pesan**: antes de subir, resize al **lado mayor máximo 1600 px** + JPEG quality **70**.
   Target ~150–350 KB/foto. Justificación: el legacy usa `quality: 40` que pierde detalle
   visible; 70 es el balance estándar calidad/tamaño. 1600 px es suficiente para documentar
   una instalación y sube rápido incluso en 3G. Usar `expo-image-manipulator`.
6. **UUIDs del lado del cliente** para `imagenId` (`expo-crypto.randomUUID()`).
7. **Nunca `DELETE` físico** en la cola de sync — soft delete o flag de estado.
8. **Sesión por día**: el instalador re-loguea cada jornada.
9. **No guardar la contraseña en plano** (corrección vs el legacy).
10. **Hasta 5 fotos por orden** (regla del legacy — validar en UI).
11. **Una sola orden en curso a la vez** (regla del legacy: estadoId=15 único).
12. **Fire-and-forget en tracking/logs** — nunca bloquean la UI.
13. **No agregar dependencias sin confirmar** en §12 o en decisiones.md.
14. **Leer el archivo antes de editarlo** (regla del stack SDD de los otros repos).

---

## 10. Flujos principales

### Flujo 1 — Jornada típica del instalador
```
Mañana:
  abrir app → login → (online) pull órdenes del día
Campo (sin señal):
  abrir orden → tab Datos: validar domicilio
  → tab Tareas: agregar 2 tareas del catálogo
  → tab Equipos: escanear barcode de decodificador
  → tab Materiales: cargar consumo
  → tab Galería: 3 fotos (quedan pendientes de upload)
  → tab Comentarios: "cliente contento"
  → botón Cerrar → estadoId=20, sincronizado=false
  → siguiente domicilio...
Vuelta al depósito (con red):
  cola de sync corre automáticamente
  → POST /ordenes/grabarSincronizar (lote)
  → POST /ordenes/guardarImagen (c/u)
  → badge de sync desaparece
```

### Flujo 2 — Anular orden
```
lista → orden en curso → Anular → confirmación
→ estadoId=90, sincronizado=false → sync en el próximo ciclo
```

### Flujo 3 — Login sin red
```
sin red → login → timeout
→ cliente: ¿hay último login del día con este alias+pass? → sí → autoriza
→ app arranca con datos locales de la última sesión
```

---

## 11. Roadmap de implementación (propuesto)

1. **Scaffold** Expo + TS + Expo Router + NativeWind + alias `@/*`.
2. **Config** `app.config.ts` con `EXPO_PUBLIC_API_URL` + `eas.json` con perfiles.
3. **HTTP client** + parser del backend legacy (con tests sobre respuestas reales).
4. **DB local (Drizzle)**: schema, migraciones, repositorios.
5. **Auth** (online + fallback offline del día).
6. **Listado de órdenes** (M2) con pull y cache local.
7. **Detalle — Tareas** (tab más simple, plantilla para el resto).
8. **Detalle — resto de tabs** (equipos, recuperos, materiales, comentarios, datos).
9. **Cámara + Galería** con upload diferido.
10. **Barcode scanner** donde aplica.
11. **Sincronización** on-demand + background.
12. **Build APK firmado** con EAS + distribución de prueba.
13. **Hardening**: timeouts, retries, métricas locales, logs para debug, Sentry.

> Cada paso requiere update de `docs/progreso.md` al completarse.

---

## 12. Decisiones cerradas y pendientes

### Cerradas (2026-04-20)

Ver `docs/decisiones.md` para el racional completo.

- Stack: React Native + Expo + TypeScript con pnpm.
- Librerías: NativeWind, Drizzle, Zustand, Expo Router, TanStack Query — **OK**.
- Diseño: modernización (respeta layout actual, paleta y tipografía nuevas).
- Dark mode: **no obligatorio**; tokens definidos pero sin toggle por ahora.
- Nombre: **Gestión de Órdenes**. Slug: `gestion-ordenes`. Package/Bundle: `com.gestionordenes.app`.
- Idioma: solo `es-AR`, sin i18n.
- Features nuevas: GPS, firma del cliente, timestamps inicio/fin — **sí** (detalle en §6, M6).
- Todas las features del legacy se mantienen.
- Plataformas: **Android 7.0+ (API 24)** y **iOS 15.1+** — cubre celulares de ~10 años.
- Staging del backend: existe (URL a definir en el `.env` de staging).
- HTTPS: se declara `usesCleartextTraffic` acotado a `alerthor.net`.
- Auth: alias + pass en cada login; sin token por ahora.
- Calidad de fotos: lado mayor 1600 px + JPEG 70 (§9, regla 5).
- Timeout HTTP: 15 s por defecto, con retry.
- Versionado: semver `1.0.0` + `buildNumber` autoincremental en EAS.
- Repo: https://github.com/saadypacheco/gestionordenes (a inicializar).

### Pendientes (resolver más adelante, no bloquean el scaffold)

- [ ] **Dark mode**: toggle + persistencia.
- [ ] **Auth con token**: negociar con el backend un flow con JWT o sesión server-side.
- [ ] **Distribución del APK**: link directo, MDM, Play Store interna, TestFlight.
- [ ] **Cuentas Apple Developer / Google Play Console**: quién las crea/maneja.
- [ ] **OTA updates** con `expo-updates`: sí/no + canal.
- [ ] **Sentry** (o alternativa): habilitación + cuenta.
- [ ] **Instalador real para testing**: necesitamos al menos 1 dispositivo/usuario real para validar la app en campo — el usuario confirmará cuando aparezca.
- [ ] **URL concreta del staging del backend**.

---

## 13. Qué NO hacer

- ❌ Modificar el backend (URLs, payload, casing).
- ❌ Migrar código Angular/Ionic al nuevo stack — sólo se migra el **comportamiento**.
- ❌ Asumir que hay red.
- ❌ Bloquear la UI esperando el sync.
- ❌ Guardar contraseñas en plano.
- ❌ Agregar dependencias sin acordar.
- ❌ Generar código antes de cerrar las decisiones pendientes del §12.
- ❌ Usar Ionic (descartado por requerimiento).
