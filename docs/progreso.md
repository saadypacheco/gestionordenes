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

## Fase 3 — DB local (Drizzle)

- [ ] Schema: `ordenes`, `orden_tareas`, `orden_equipos`, `orden_materiales`, `orden_recuperos`, `orden_imagenes`, catálogos, `sync_queue`
- [ ] Migración inicial + script `drizzle-kit`
- [ ] Repositorios tipados
- [ ] Tests de repositorios

## Fase 4 — Auth

- [ ] Pantalla `login.tsx`
- [ ] `useLogin` con online + fallback offline del día
- [ ] Guard en root layout (redirige a `/login` si no hay sesión)
- [ ] `expo-secure-store` para hash derivado (no pass en plano)

## Fase 5 — Listado de órdenes

- [ ] `(tabs)/index.tsx` con lista + pull-to-refresh
- [ ] Cache en SQLite + refetch con TanStack Query
- [ ] Banner offline + badge de pendientes

## Fase 6 — Detalle de orden

- [ ] Layout con 7 sub-tabs
- [ ] Tab Tareas (plantilla de referencia para las demás)
- [ ] Tab Equipos (con barcode scanner)
- [ ] Tab Recuperos
- [ ] Tab Materiales
- [ ] Tab Comentarios
- [ ] Tab Datos
- [ ] Tab Galería (con cámara + upload diferido)

## Fase 7 — Extensiones (M6)

- [ ] GPS al cerrar (`expo-location`)
- [ ] Timestamps inicio/fin
- [ ] Firma del cliente (canvas + upload como imagen)

## Fase 8 — Sincronización

- [ ] `syncWorker` on-demand
- [ ] Background task con `expo-background-fetch`
- [ ] Retry + backoff

## Fase 9 — Build + distribución

- [ ] EAS Build preview (APK)
- [ ] Test en dispositivo real (pendiente: conseguir un instalador)
- [ ] Iteración de feedback
- [ ] Build de producción

## Fase 10 — Hardening

- [ ] Logs locales rotables
- [ ] Sentry (si se confirma)
- [ ] OTA updates (si se confirma)
- [ ] Documentación de deploy

---

## Bloqueos actuales

Ninguno. Listo para arrancar Fase 1 al confirmar el plan de scaffold.
