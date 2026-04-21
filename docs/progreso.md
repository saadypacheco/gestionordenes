# Progreso

Estado de la migración. Se actualiza al cerrar cada fase.

## Fase 0 — Definición

- [x] Análisis del legacy `ordenes20210128/`
- [x] Decisión de stack (React Native + Expo + TS) — ver `decisiones.md`
- [x] `AGENTS.md` con visión, stack, módulos, reglas críticas
- [x] `CLAUDE.md` con reglas de trabajo
- [x] Paleta, plataformas objetivo, identificación de la app
- [ ] Confirmar comando de scaffold y arrancar Fase 1

## Fase 1.5 — CI/CD + testing + git workflow ✅

- [x] Jest 29 + jest-expo 55 + testing-library/react-native + @types/jest
- [x] `jest.config.js` con preset `jest-expo` y `moduleNameMapper` para `@/*`
- [x] Smoke tests en `src/config/constants.test.ts` (13 tests verdes, regresión de contrato con backend legacy)
- [x] Scripts `test`, `test:watch`, `test:ci` en `package.json`
- [x] `.github/workflows/ci.yml` — lint + typecheck + tests en PRs a `main`/`develop` y push a `develop`
- [x] `.github/workflows/release.yml` — quality gate + `eas build --profile preview --platform android` en push a `main`
- [x] `.github/pull_request_template.md`
- [x] Secret `EXPO_TOKEN` cargado en GitHub (por el usuario)
- [x] `CLAUDE.md` actualizado con sección "Git workflow"
- [x] `AGENTS.md` §13 documenta distribución y EAS dashboard
- [x] Rama `develop` creada desde `main` y pusheada

## Fase 1 — Scaffold ✅

- [x] `pnpm create expo-app` con template `default` (Expo SDK 54 + TS + Expo Router)
- [x] Estructura de carpetas según `AGENTS.md` §7 (app/ + src/ con subdirs)
- [x] Rutas placeholder: login, (tabs)/{index,sync}, orden/[id]/{7 tabs}, +not-found
- [x] `app.config.ts` con `EXPO_PUBLIC_API_URL` dinámico
- [x] `app.json` con `bundleIdentifier` + `package` = `com.gestionordenes.app`, minSdk 24, deploymentTarget 15.1
- [x] `eas.json` con perfiles `development` / `preview` / `production`
- [x] `tailwind.config.js` con la paleta del §4
- [x] `drizzle.config.ts` apuntando a `./src/db/schema.ts`
- [x] `metro.config.js` con `withNativeWind`
- [x] `babel.config.js` con preset Expo + nativewind
- [x] `tsconfig.json` con alias `@/*` → `./src/*`, excluye legacy
- [x] `assets/network_security_config.xml` para cleartext acotado a alerthor.net
- [x] `.env.example`, `.gitignore` ampliado
- [x] `README.md` reemplazado por el nuestro
- [x] `docs/backend-endpoints.md` con contrato exhaustivo del backend legacy
- [x] Dependencias instaladas: Zustand, TanStack Query, Drizzle ORM, NativeWind 4 (+ tailwind 3.4), Lucide, Inter font, react-hook-form + zod, expo-sqlite/camera/secure-store/location/crypto/image-manipulator/file-system/network/background-fetch/task-manager/updates/build-properties, AsyncStorage, NetInfo
- [x] Dev deps: drizzle-kit, tailwindcss, @types/node
- [x] `pnpm typecheck` pasa limpio
- [x] `expo config` carga sin errores
- [x] `git init` + primer commit + push a `origin/main` de https://github.com/saadypacheco/gestionordenes

## Fase 2 — HTTP + parser backend ✅

- [x] Tipos de dominio: `src/domain/{errores,usuario,orden,catalogos}.ts`
- [x] `src/api/client.ts` con timeout + retry exponencial + errores tipados (`ApiError`)
- [x] `src/api/parsers.ts` que normaliza todos los quirks del backend legacy:
  - Unwrap `[[...]]` y `[[{}]]`
  - Casing mixto (`Cantidad`/`cantidad`, `MAC`/`nroSerie`, `materialid`/`materialId`, `Descripcion`/`descripcion`)
  - Normalización de fechas (`"2026-04-20T00:00:00"` → `"2026-04-20"`)
  - `cliente: "undefined"` → `""`
  - Boolean desde `1`/`0`/`true`/`false`/`"si"`/`"no"`
- [x] Fixtures realistas en `src/api/__fixtures__/responses.ts`
- [x] 23 tests nuevos en `src/api/parsers.test.ts` (36 en total contando los de constants)
- [x] Endpoints tipados: `auth.ts`, `ordenes.ts`, `listas.ts`, `imagenes.ts`
- [x] `docs/backend-endpoints.md` ya existía (de Fase 1.5)
- [x] `pnpm typecheck` ✓
- [x] `pnpm lint` ✓ (0 warnings)
- [x] `pnpm test:ci` ✓ (36 tests)
- [x] `pnpm dlx expo-doctor@latest` ✓ (17/17)

## Fase 3 — DB local (Drizzle) ✅

- [x] Schema: `usuarios`, `ordenes`, `orden_tareas`, `orden_equipos` (con flag `tipo` instalado/recuperado), `orden_materiales`, `orden_imagenes`, 4 `cat_*`, `sync_queue` (11 tablas totales)
- [x] Migración inicial `0000_tidy_pride.sql` generada con `pnpm db:generate`
- [x] `src/db/client.ts` — Drizzle sobre expo-sqlite, archivo `gestion-ordenes.db`
- [x] `src/db/migrate.ts` — hook `useDbMigrations` (a conectar al root layout en Fase 4)
- [x] `src/db/mappers.ts` — conversión `Orden ↔ row` pura + 10 tests de roundtrip
- [x] `src/db/repositories/ordenes.ts` — `saveOrden` (transaccional, replace sub-colecciones, preserva imágenes por UUID), `getOrden`, `listOrdenes`, `listOrdenesPendientesSync`, `markOrdenSincronizada`
- [x] `src/db/repositories/catalogos.ts` — replace + get para 4 catálogos
- [x] `src/db/repositories/syncQueue.ts` — enqueue (con dedup para grabar_orden), listPending, removeItem, markAttemptFailed
- [x] Normalización `Orden.numero: string | null` (antes `number | string | null`) — el backend mezcla, la DB guarda text, el dominio unifica
- [x] `pnpm typecheck` ✓
- [x] `pnpm lint` ✓ (0 warnings)
- [x] `pnpm test:ci` ✓ (46 tests: 13 constants + 23 parsers + 10 mappers)
- [x] `pnpm dlx expo-doctor@latest` ✓ (17/17)

## Fase 4 — Auth ✅

- [x] `src/lib/hash.ts` — SHA-256 via expo-crypto (7 tests)
- [x] `src/lib/fecha.ts` — helpers `fechaHoyStr`, `mismaFecha` (7 tests)
- [x] `src/db/repositories/usuarios.ts` — saveSesion, getSesion, getSesionConHash, clearSesion
- [x] `src/stores/authStore.ts` — Zustand con `usuario` + `initializing`
- [x] `src/features/auth/validators.ts` — zod schema del form
- [x] `src/features/auth/useSession.ts` — `useBootstrapSession` (lee DB al arrancar, invalida si es de otro día), `useUsuario`, `useAuthInitializing`
- [x] `src/features/auth/useLogin.ts` — mutation online con fallback offline del día (hash local)
- [x] `src/features/auth/useLogout.ts` — limpia sesión, conserva órdenes
- [x] `app/login.tsx` — form real con react-hook-form + zod, loading state, mensajes de error en español
- [x] `app/_layout.tsx` — `useDbMigrations` + session guard con `router.replace`
- [x] `app/(tabs)/_layout.tsx` — header right con nombre del usuario + botón logout (ícono Lucide)
- [x] **60 tests verdes** (13 constants + 23 parsers + 10 mappers + 7 hash + 7 fecha)
- [x] `pnpm typecheck` / `pnpm lint` / `pnpm dlx expo-doctor` ✓

## Fase 5 — Listado de órdenes ✅

- [x] `src/hooks/useNetwork.ts` — wrap reactivo de NetInfo
- [x] `src/lib/formato.ts` + 10 tests — `labelEstadoOrden`, `formatoDireccion`, `formatoCliente`, `tituloOrden`
- [x] `src/features/ordenes-list/useOrdenesDelDia.ts` — offline-first: lee de DB local como source of truth, fetch del backend opcional al montar + pull-to-refresh, maneja errores de red silenciosamente (banner refleja), preserva datos locales si falla
- [x] Componentes: `OrdenCard` (ícono chevron, badge de estado con tone-based colors, badge "Pendiente" si `sincronizado=false`), `OfflineBanner`, `EmptyState` (con copy distinto según online/offline), `ErrorBanner` (con botón "Reintentar")
- [x] `app/(tabs)/index.tsx` — FlatList con RefreshControl + loading state + empty state + banners. Tap en card → `/orden/[id]`
- [x] Icons: `CloudOff`, `ChevronRight`, `AlertTriangle`, `RefreshCw`, `ClipboardList` de lucide-react-native
- [x] `pnpm typecheck` / `pnpm lint` / `pnpm test:ci` (72 tests) / `pnpm dlx expo-doctor` (17/17) ✓
- [x] `pnpm exec expo export --platform android` ✓ (bundle 7.18 MB OK)

## Fase 6 — Detalle de orden

### Fase 6A — Layout + tab Tareas (plantilla) ✅

- [x] `src/features/orden-detalle/useOrdenDetalle.ts` — hook offline-first (DB-only; remoto llega en Fase 8)
- [x] `src/features/orden-detalle/OrdenContext.tsx` — provider + `useOrdenContext()` para compartir orden entre sub-tabs
- [x] `HeaderOrden` (cliente + dirección + badge estado + back + chip "Pendiente"), `DetalleLoading`, `DetalleNotFound`, `TabEmptyState` reusable
- [x] `tareas/TareaRow.tsx` read-only (descripción + cantidad)
- [x] `app/orden/[id]/_layout.tsx` envuelve `Tabs` con `OrdenProvider` + header custom + gate loading/notFound
- [x] `app/_layout.tsx` quita header del Stack para `orden/[id]` (usamos el nuestro)
- [x] `app/orden/[id]/tareas.tsx` FlatList + empty state
- [x] `pnpm typecheck` / `pnpm lint` / `pnpm test:ci` (72 tests) / `pnpm dlx expo-doctor` (17/17) ✓
- [x] `pnpm exec expo export --platform android` ✓ (bundle 7.19 MB OK)

### Fase 6B — Tab Datos (read-only) ✅

- [x] `src/lib/fecha.ts` — helpers `fechaDisplay` (DD/MM/YYYY) y `fechaHoraDisplay` (DD/MM/YYYY HH:mm), ambos null-safe con fallback `—`
- [x] `src/features/orden-detalle/datos/DatoRow.tsx` — label/valor con fallback `—`, soporta multiline
- [x] `src/features/orden-detalle/datos/DatosSeccion.tsx` — grupo titulado estilo card
- [x] `app/orden/[id]/datos.tsx` — ScrollView con secciones: Identificación, Domicilio, Fechas, Responsables, Extensiones M6 (si hay), Comentarios de cabecera
- [x] 8 tests nuevos (fecha) → **80 tests verdes**
- [x] typecheck / lint / expo-doctor 17/17 / bundle 7.2 MB ✓

### Fase 6C — Tab Materiales (read-only) ✅

- [x] `src/features/orden-detalle/materiales/MaterialRow.tsx` — descripción + badge cantidad + chips de serie (`#nroSerie`) y medida (`ini → fin`)
- [x] `app/orden/[id]/materiales.tsx` — FlatList + `TabEmptyState` con ícono `Package`
- [x] typecheck / lint / test:ci (80) / bundle 7.21 MB ✓

### Fase 6D — Tab Comentarios (read-only) ✅

- [x] `src/features/orden-detalle/comentarios/ComentariosCard.tsx` — card con ícono + label + nota del despachador
- [x] `app/orden/[id]/comentarios.tsx` — ScrollView con la card o empty state
- [x] `datos.tsx` — se remueve la sección duplicada "Comentarios de cabecera" (ahora vive solo en el tab dedicado)

### Fase 6E — Tab Recuperos (read-only) ✅

- [x] `src/features/orden-detalle/equipos/EquipoRow.tsx` — componente **compartido** para Equipos + Recuperos: thumb de imagen (o fallback `ImageOff`) + descripción + chip de nro de serie + chip de abonado contextual
- [x] `app/orden/[id]/recuperos.tsx` — FlatList + `TabEmptyState` con ícono `PackageSearch`

### Fase 6F — Tab Equipos (read-only) ✅

- [x] `app/orden/[id]/equipos.tsx` — reusa `EquipoRow` con `contexto="instalado"` sobre `orden.equipos`
- [x] Empty state con ícono `Boxes`

### Fase 6G — Tab Galería (read-only) ✅

- [x] `src/lib/imagen.ts` — helper `imagenToUri` (base64 → data URI, pass-through para `file://`/`data:`) + tests
- [x] `galeria/FotoThumb.tsx` — thumbnail cuadrado con fallback `ImageOff`
- [x] `galeria/FotoModal.tsx` — modal fullscreen con botón cerrar
- [x] `app/orden/[id]/galeria.tsx` — grid 3 columnas + modal al tap

### Fase 6F.2 — Equipos (write) ✅

- [x] `equipos/validators.ts` — zod schema `equipoFormSchema` + helper `normalizarNroSerie` (+9 tests)
- [x] `equipos/useEquiposMutations.ts` — `agregar()` (con lookup a `cat_equipos` + dedup por nroSerie) y `quitar(index)`, ambos persisten con `saveOrden(sincronizado=false)` + `enqueueGrabarOrden(ModoGrabado.Equipos)` + `reload()`
- [x] `equipos/EquipoForm.tsx` — react-hook-form + zod resolver, campos nroSerie (auto-uppercase), descripción, switch abonado; soporta `nroSerieInicial` para precarga desde scanner
- [x] `equipos/ScannerModal.tsx` — fullscreen `CameraView` con `onBarcodeScanned`, marco visual central, manejo de permisos (`useCameraPermissions`), soporte para 9 tipos de código (QR, code128/39/93, EAN13/8, UPC A/E, datamatrix), lock anti-doble-disparo con botón "escanear de nuevo"
- [x] `equipos/AgregarEquipoModal.tsx` — bottom sheet con 3 pasos (elegir / scanner / form), keyboard-aware, detecta duplicados y muestra Alert
- [x] `components/FAB.tsx` — floating action button reusable
- [x] `EquipoRow.tsx` — prop opcional `onDelete` que muestra botón de trash en danger
- [x] `equipos.tsx` — FAB "+" abre modal, long/tap a trash pide confirmación y quita
- [x] 96 tests verdes / typecheck / lint (sin warnings) / bundle 7.28 MB ✓

### Fase 6G.2 — Galería (write) 🔜

> Tomar foto, comprimir, guardar path local, encolar upload. Tope `MAX_FOTOS_POR_ORDEN = 5`.

Scope:

- [ ] `src/features/orden-detalle/galeria/useCamara.ts` — pide permiso, abre `CameraView` fullscreen, botón disparo
- [ ] `src/features/orden-detalle/galeria/CamaraModal.tsx` — fullscreen con guía + preview tras el disparo + confirmar/repetir
- [ ] `src/lib/fotos.ts` — `procesarFoto(uri)`: pipeline con `expo-image-manipulator` (resize al lado más largo = `FOTO_MAX_LADO_PX` = 1600, `jpeg` quality `FOTO_JPEG_QUALITY` = 0.7), devuelve path persistente via `expo-file-system` en `FileSystem.documentDirectory + ordenes/{ordenId}/{uuid}.jpg`
- [ ] `src/features/orden-detalle/galeria/useAgregarFoto.ts` — write: genera `imagenId` con `expo-crypto.randomUUID()`, procesa foto, inserta `OrdenImagen` (imagen = path local, mime `image/jpeg`), `saveOrden`, enqueue `subir_foto` en `sync_queue`, refresca context
- [ ] Extender `galeria.tsx`: FAB "+" si `imagenes.length < 5`. Al tap en `FotoModal` → botón "Eliminar foto" (soft delete via `estadoId` o remove local — definir en §12 de AGENTS.md)
- [ ] `imagenToUri` ya soporta `file://` — la galería cachea bien
- [ ] Tests: `procesarFoto` con mock de image-manipulator, cálculo de ruta, validación del tope de 5

### Fase 7 — Extensiones M6 🔜

> Requieren que Fase 6F.2 y 6G.2 estén cerradas porque dependen de write en orden.

- [ ] `src/features/orden-detalle/useIniciarOrden.ts` — setea `iniciadaAt` (`new Date().toISOString()`) + `saveOrden` + enqueue
- [ ] `src/features/orden-detalle/useCerrarOrden.ts` — setea `cerradaAt`, captura GPS (`expo-location`, `Accuracy.Balanced`, timeout `GPS_TIMEOUT_MS` = 8s), guarda en `orden.ubicacion` como `"lat,lng"`, `saveOrden`, enqueue
- [ ] `src/features/orden-detalle/firma/FirmaCanvas.tsx` — canvas con `react-native-signature-canvas` (agregar dep — confirmar con el usuario) o alternativa con `react-native-gesture-handler` + SVG. Exporta base64 → se inserta como `OrdenImagen` con flag diferenciador
- [ ] Botones en header: "Iniciar" / "Cerrar" según `estadoId`
- [ ] Tab Datos: mostrar timestamps cuando existan (ya hay sección "Extensiones M6" preparada)

### Fase 8 — Sincronización 🔜

- [ ] `src/features/sync/syncWorker.ts` — itera `sync_queue`, según `tipo`:
  - `grabar_orden` → POST `/ordenes/grabarSincronizar` con el modo correcto
  - `subir_foto` → POST `/imagenes/subir` con base64 desde el path local
- [ ] Retry con backoff exponencial (usa `HTTP_RETRY_INTENTOS` + `HTTP_TIMEOUT_MS` del `client.ts`)
- [ ] Background task con `expo-background-fetch` + `expo-task-manager`, intervalo `SYNC_BACKGROUND_INTERVAL_MIN = 15`
- [ ] Tab "Sincronizar" (`app/(tabs)/sync.tsx`): botón manual + status (pendientes, última sync OK, último error) + banner NetInfo
- [ ] Política: si después de N intentos falla, marca `attemptFailed` con error, se queda en la cola para retry manual
- [ ] Al marcar una orden sincronizada, refrescar desde backend con `/ordenes/listar` para reconciliar IDs nuevos (equipos/fotos creados en server)
- [ ] Tests: mock `fetch`, verificar retry/backoff, verificar que imagen local se borra solo al confirmar upload

## Fase 9 — Build + distribución

- [ ] EAS Build preview (APK) — ✅ pipeline ya anda, pendiente verificar APK actual en celular
- [ ] Test en dispositivo real (pendiente: conseguir un instalador)
- [ ] Iteración de feedback
- [ ] Build de producción

## Fase 10 — Hardening

- [ ] Logs locales rotables (archivo diario en `documentDirectory/logs/`)
- [ ] Sentry (si se confirma en §12 de AGENTS.md)
- [ ] OTA updates con `expo-updates` (si se confirma)
- [ ] Documentación de deploy

---

## Roadmap resumen

| Fase | Estado | Depende de |
|------|--------|-----------|
| 6A–6E | ✅ mergeado (PR #11, PR #13/14 abiertos) | — |
| 6F–6G read-only | ✅ (PR #15 abierto) | — |
| 6F.2 Equipos write | 🔜 | EquipoRow (hecho), scanner nuevo |
| 6G.2 Galería write | 🔜 | FotoThumb/FotoModal (hechos), procesador de foto nuevo |
| 7 Extensiones M6 | 🔜 | 6F.2 + 6G.2 (ambas usan el mismo patrón de write+enqueue) |
| 8 Sync worker | 🔜 | Fase 7 cerrada (sync_queue con items reales) |
| 9 Build prod | 🔜 | Feedback de APK actual (preview) |
| 10 Hardening | 🔜 | Fase 9 estabilizada |

## Bloqueos actuales

- ⏳ EAS build `7e704f5e` del release 6A+6B sigue **in queue** desde 11:59 — normalmente tarda pocos minutos, la cola parece lenta. Sin APK todavía no hay validación manual en dispositivo.
