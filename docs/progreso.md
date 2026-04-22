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

### Fase 6G.2 — Galería (write) ✅

- [x] **Domain**: `OrdenImagen.subida?: boolean` (undefined = true para compat backend)
- [x] **Mapper fix** (`src/db/mappers.ts`): `toOrdenImagenRow` routea `file://` a `imagenUri` y base64 a `imagenBase64`; `subida` default depende de isLocal (local→false, base64→true) pero respeta override explícito. `fromOrdenImagenRow` prefiere `imagenUri` sobre `imagenBase64`. +4 tests
- [x] **Repo** (`ordenes.ts`): `removeImagenLocal(ordenId, imagenId)` — delete físico de una imagen, marca orden `sincronizado=false`
- [x] **Pipeline** (`galeria/fotos.ts`): `dimensionesResize` puro + 6 tests, `procesarYGuardarFoto`: `manipulateAsync` para leer dimensiones reales → resize a lado-máximo 1600px + JPEG quality 0.7 → move al `Paths.document/ordenes/{ordenId}/{uuid}.jpg`
- [x] **Mutations** (`galeria/useFotosMutations.ts`): `agregar(sourceUri)` — genera UUID con `expo-crypto.randomUUID()`, procesa foto, `saveOrden` con `sincronizado=false`, `enqueueSubirImagen`, rollback de archivo si falla. Tope `MAX_FOTOS_POR_ORDEN = 5`. `quitar(imagen)` solo si `subida !== true`, borra archivo del fs.
- [x] **UI**:
  - `CamaraModal.tsx` — `CameraView` + shutter 20×20px, preview post-shot con Repetir / Usar foto + loading en el confirm
  - `FotoModal.tsx` extendido con chip "Sincronizada" y botón de trash cuando `subida !== true`
  - `galeria.tsx` — FAB con `Camera` icon, header con contador `N/5 fotos`, Alert de tope y error handling
- [x] 106 tests verdes / typecheck / lint clean / bundle 7.34 MB ✓

### Fase 7 — Extensiones M6 ✅

- [x] **Dep**: `react-native-signature-canvas@5.0.2` + `react-native-webview@13.15.0` (peer) instaladas via `pnpm expo install`
- [x] **Domain**: `OrdenImagen.tipo?: 'foto' | 'firma'` (+ test de roundtrip que preserva el tipo)
- [x] **GPS** (`src/lib/gps.ts`): `obtenerUbicacion()` con permisos + timeout `GPS_TIMEOUT_MS` (8s) vía `Promise.race`, devuelve `"lat,lng"` con 6 decimales o resultado con reason. Helpers puros `formatearUbicacion` y `parsearUbicacion` (null-safe, valida rangos lat [-90,90], lng [-180,180]) + 14 tests
- [x] **Hooks** (`acciones/useOrdenAcciones.ts`):
  - `iniciar()`: setea `iniciadaAt = now`, fuerza `estadoId=EnCurso` si no estaba cerrada, encola `grabar_orden(ModoGrabado.Estado)`
  - `cerrar({ firmaSourceUri })`: captura GPS (silencioso si falla, mensaje diferido), procesa firma como `OrdenImagen(tipo='firma')` vía `procesarYGuardarFoto`, setea `cerradaAt=now` + `estadoId=Cerrada`, encola `grabar_orden(Todo)` + `subir_imagen(firma)`
- [x] **FirmaModal** (`firma/FirmaModal.tsx`): `react-native-signature-canvas` fullscreen con `readSignature()` → `onOK(dataUri)` → callback al padre. Botones Borrar / Confirmar con loading state, webStyle oculta footer nativo, usa paleta del proyecto
- [x] **AccionesBar** (`acciones/AccionesBar.tsx`): barra al pie del `HeaderOrden` con reglas según estado (Anulada → lock; Cerrada → badge; En curso sin `iniciadaAt` → botón Iniciar; En curso con `iniciadaAt` → botón Cerrar que abre FirmaModal). Prompt si intenta cerrar sin iniciar. Alert diferido si GPS falló
- [x] **Galería filtrada**: `galeria.tsx` y `useFotosMutations` excluyen `tipo='firma'` del tope de `MAX_FOTOS_POR_ORDEN` y de la grid (las firmas no son "fotos de evidencia")
- [x] **Tab Datos enriquecido**: sección "Extensiones (M6)" ahora muestra Iniciada / Cerrada / Ubicación (tap → abre Google Maps con `Linking`) / Firma cliente (badge Firmada / No firmada)
- [x] 116 tests verdes / typecheck / lint clean / expo-doctor 17/17 / bundle 7.44 MB ✓

### Fase 8 — Sincronización ✅

- [x] **Schema**: `sync_queue.tipo` extendido con `'borrar_imagen'` (type-only, sin migración SQL)
- [x] **Repo helpers** (`syncQueue.ts`): `enqueueBorrarImagen`, `removeSubirImagenIfPending` (limpia uploads pendientes si se borra antes de sync), `markImagenSubida` en ordenes
- [x] **API** (`imagenes.ts`): `borrarImagen(ordenId, imagenId)` → `POST /ordenes/borrarImagen` — contrato asumido del legacy, ajustar si difiere
- [x] **useFotosMutations.quitar** actualizado: siempre permite eliminar; si `subida=true` encola `borrar_imagen`, siempre limpia uploads pendientes del mismo imagenId
- [x] **FotoModal**: botón delete siempre disponible, chip "Sincronizada" queda como info
- [x] **backoff** (`sync/backoff.ts`): exponencial base 30s capado a 10min (30s/1m/2m/4m/8m/10m...) + 10 tests
- [x] **syncWorker** (`sync/syncWorker.ts`):
  - `run(ahora?)`: itera cola FIFO, respeta backoff vía `estaListo()`, es reentrante-safe (`_running` lock)
  - Procesadores por tipo: `grabar_orden` envía cabecera sin imágenes + modo, `subir_imagen` solo archivos `file://`, `borrar_imagen` POST simple
  - Errores transitorios → `markAttemptFailed` + sigue con otros items
  - 10 tests con mocks de repos + API (cola vacía, cada tipo, ausente, skip por backoff, falla parcial)
- [x] **useSyncWorker** hook: pendientes + running + último resultado, auto-run al foreground (AppState) + al pasar offline→online, expone `sincronizar()` manual
- [x] **Tab Sincronizar** (`app/(tabs)/sync.tsx`): resumen con ícono + contador, stats del último pase (procesadas/con error/postergadas), botón CTA, lista de items pendientes con `SyncQueueRowItem` mostrando intentos, último error y last attempt
- [x] **Background task** (`sync/background.ts`): `defineSyncTask` en top-level del root layout + `registerBackgroundSync` cuando hay usuario (interval `SYNC_BACKGROUND_INTERVAL_MIN`, `stopOnTerminate=false`, `startOnBoot=true`)
- [x] 136 tests verdes / typecheck / lint clean / expo-doctor 17/17 / bundle 7.48 MB ✓

## Fase 9 — Build + distribución 🔜

- [ ] EAS Build preview (APK) — ✅ pipeline anda; pendiente validación end-to-end en celular con backend vivo
- [ ] Test en dispositivo real (pendiente: usuario + credenciales del backend)
- [ ] Iteración de feedback
- [ ] Build de producción
- [ ] Apple Developer account (iOS) — decisión pendiente en AGENTS.md §12

## Fase 10 — Hardening 🔜

- [ ] Logs locales rotables (archivo diario en `documentDirectory/logs/`, rota cada 7 días)
- [ ] Sentry (si se confirma en AGENTS.md §12)
- [ ] OTA updates con `expo-updates` (si se confirma)
- [ ] Documentación de deploy (`docs/deploy.md`)
- [ ] Migrar GitHub Actions a Node 24 (warnings de deprecation de Node 20 en CI)

---

## Fase 11 — Capa AI (diferenciadores comerciales) 🔜

> Features que ningún competidor legacy tiene. Costo variable bajo (~$0.008/orden) con margen > 80% si se vende a $10/instalador/mes. Detalle completo en `docs/ideas-producto.md` cuando se cree.

### 11A — Voz → reporte estructurado

- [ ] Capturar audio on-device con `expo-av` (ya instalable, no hay overhead)
- [ ] Transcripción: evaluar **Groq Whisper** (~$0.0001/orden, 10× más rápido que OpenAI) vs **Deepgram Nova** (calidad superior, $0.002/orden)
- [ ] LLM: **Claude Haiku 4.5** para armar el texto estructurado a partir del transcript + contexto de la orden (~$0.002/orden). Usa prompt caching para el system prompt y el catálogo de tareas
- [ ] Reemplaza / complementa el campo `comentarios` de la orden
- [ ] UI: botón de micrófono en tab Comentarios + spinner + preview del texto antes de guardar

### 11B — OCR del nroSerie de equipos

- [ ] Dep: `@react-native-ml-kit/text-recognition` (on-device, offline, $0 por orden)
- [ ] Integrar con `ScannerModal` de equipos como alternativa al barcode (algunos equipos viejos no tienen barcode pero sí nro serie impreso)
- [ ] Fallback a **Claude Vision (Haiku)** cuando el OCR on-device falla (~$0.001/imagen) — ~5% de casos
- [ ] Autocompletar form desde el catálogo `cat_equipos` al matchear el nroSerie detectado

### 11C — Validación de fotos con AI

- [ ] Pipeline: al subir foto en Galería, disparar llamada async a **Claude Haiku 4.5 vision** con prompt del checklist del tipo de trabajo (~$0.0014/foto)
- [ ] Respuesta: `{ ok: boolean, problemas: string[], puedeCerrar: boolean }`
- [ ] UI: badge en `FotoThumb` (✓ verde / ⚠️ amarillo / ✗ rojo) + tooltip con el motivo cuando no pasa
- [ ] Gate opcional: admin configurable por tipo de trabajo para bloquear el cierre de orden si hay fotos flaggeadas
- [ ] Batching: una sola call de Claude con las N fotos de la orden + el checklist → ahorra ~60% vs N calls
- [ ] Prompt caching del checklist (repetido cada orden) → ahorra 30% adicional

### Estimación de costos (resumen)

| Volumen | AI/mes | Hosting | Total |
|---|---|---|---|
| 100 órdenes/día | $24 | $20 | **~$45** |
| 1.000 órdenes/día | $240 | $50 | **~$290** |
| 10.000 órdenes/día | $2.400 | $200 | **~$2.600** |

---

## Fase 12 — Plataforma SaaS (pivot comercial) 🔜

> Requiere decisión estratégica: hoy el backend es monotenant de Alerthor. Para vender a otras empresas hay que pivotear a una capa propia (o convivir con Alerthor como integración para ese cliente).

### 12A — Backend propio + multi-tenant

- [ ] Elegir stack: **Hono + Neon/Supabase** (serverless, cheap) vs **NestJS + Postgres** (más clásico)
- [ ] Schema multi-tenant por `empresaId` (row-level security en Supabase, o middleware en Hono)
- [ ] Migración del modelo desde lo que tenemos en `src/domain/` (ya está definido, solo hay que exponerlo)
- [ ] Config por cliente: la app lee `extra.apiUrl` del `app.config.ts` — se pueden tener builds diferentes por cliente (white-label) o una sola build con picker inicial

### 12B — Portal web del despachador

- [ ] Nuevo repo: **Next.js + tRPC/Hono + la misma API del backend propio**
- [ ] Mapa en tiempo real (Mapbox o Google Maps) con instaladores activos
- [ ] Dashboard de órdenes por estado (Kanban o tabla)
- [ ] Re-asignación drag-and-drop
- [ ] Notificaciones push al mobile cuando cambia algo (Expo Push)
- [ ] WebSocket o polling para sync en tiempo real

### 12C — Link público al cliente final

- [ ] Endpoint `GET /public/orden/:token` — token firmado (JWT corto o UUID con ACL)
- [ ] Página pública (Next.js): "Tu técnico llega en X min", foto + nombre, mapa en vivo
- [ ] Al cerrar orden: pantalla "Firmá acá" (reuse del mismo canvas) + encuesta NPS
- [ ] Email/SMS con el link — Twilio / SendGrid / Brevo

### 12D — White-label + configurador

- [ ] Branding por empresa (logo, colores, splash) — via `app.config.ts` dinámico (EAS Build profile por cliente)
- [ ] Admin web para configurar: catálogos (tareas/materiales/equipos), estados de orden, checklists de fotos por tipo de trabajo
- [ ] Self-service de signup para nuevos clientes (pricing page → onboarding)

### 12E — Integraciones

- [ ] Webhooks salientes al cerrar orden (para CRM/ERP del cliente)
- [ ] Zapier/Make conector
- [ ] Conectores directos a: HubSpot, Odoo, Alegra/Colppy (facturación)

---

## Fase 13 — Feature polish operativo 🔜

> Mejoras de experiencia que los instaladores piden (post-feedback real). No son diferenciadores pero suman retención.

- [ ] Checklists obligatorios por tipo de trabajo (gate configurable) antes de cerrar
- [ ] Stock en camioneta por técnico (inventario inicial + descuento por material consumido + alertas de bajo stock)
- [ ] Chat interno con despacho + "pedir ayuda a supervisor" (foto + audio)
- [ ] Route optimizer al abrir la jornada (proximidad + ventanas horarias)
- [ ] KPIs por técnico (first-time-fix rate, tiempo promedio, órdenes/día)
- [ ] Dark mode (tokens listos en `tailwind.config.js`, falta el toggle)
- [ ] Audio notes en cualquier tab (complemento de la feature 11A de voz→reporte)
- [ ] i18n (hoy es-AR hardcoded; abrir al menos a es-genérico + pt-BR)
- [ ] Tour de onboarding inicial (primer login → 3 pantallas)

---

## Roadmap resumen

| Fase | Estado |
|------|--------|
| 0–5 | ✅ mergeado |
| 6 read-only (A–G) | ✅ mergeado |
| 6F.2 + 6G.2 + 7 + 8 | ✅ mergeado (PR #21 a main) |
| 9 Build prod | 🔜 espera feedback real + Apple Dev |
| 10 Hardening | 🔜 post-validación de usuarios |
| 11 AI layer | 🔜 diferenciador comercial — empezar por 11A (voz→reporte) como demo |
| 12 SaaS platform | 🔜 requiere decisión de pivot (backend propio) |
| 13 Polish operativo | 🔜 post-feedback |

## Bloqueos actuales

- ⏳ Pendiente validación end-to-end en celular con backend vivo + credenciales.
- 📋 Decisiones pendientes (AGENTS.md §12): firma de dependencia confirmada ✅, resto siguen abiertas (OTA, Sentry, dark mode, iOS deploy, staging URL, channel de distribución).
