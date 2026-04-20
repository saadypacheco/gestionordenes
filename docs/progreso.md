# Progreso

Estado de la migración. Se actualiza al cerrar cada fase.

## Fase 0 — Definición

- [x] Análisis del legacy `ordenes20210128/`
- [x] Decisión de stack (React Native + Expo + TS) — ver `decisiones.md`
- [x] `AGENTS.md` con visión, stack, módulos, reglas críticas
- [x] `CLAUDE.md` con reglas de trabajo
- [x] Paleta, plataformas objetivo, identificación de la app
- [ ] Confirmar comando de scaffold y arrancar Fase 1

## Fase 1 — Scaffold

- [x] `pnpm create expo-app` con template `default` (Expo SDK 54 + TS + Expo Router)
- [x] Estructura de carpetas según `AGENTS.md` §7 (app/ + src/ con subdirs)
- [x] Rutas placeholder: login, (tabs)/{index,sync}, orden/[id]/{7 tabs}, +not-found
- [x] `app.config.ts` con `EXPO_PUBLIC_API_URL`
- [x] `app.json` con `bundleIdentifier` + `package` = `com.gestionordenes.app`, minSdk 24, deploymentTarget 15.1
- [x] `eas.json` con perfiles `development` / `preview` / `production`
- [x] `tailwind.config.js` con la paleta del §4
- [x] `drizzle.config.ts` apuntando a `./src/db/schema.ts`
- [x] `metro.config.js` con `withNativeWind`
- [x] `babel.config.js` con preset Expo + nativewind
- [x] `tsconfig.json` con alias `@/*` → `./src/*`
- [x] `assets/network_security_config.xml` para cleartext acotado a alerthor.net
- [x] `.env.example`, `.gitignore` (ampliado)
- [x] `README.md` reemplazado por el nuestro
- [x] `docs/backend-endpoints.md` con contrato exhaustivo del backend legacy
- [ ] Dependencias adicionales instaladas (en curso)
- [ ] `git init` + primer commit + remote a GitHub
- [ ] `pnpm start` corriendo sin errores

## Fase 2 — HTTP + parser backend

- [ ] `src/api/client.ts` con timeout + retry + manejo de errores
- [ ] `src/api/parsers.ts` que normaliza casing y unwraps `resp[0]`
- [ ] Tipos en `src/domain/`
- [ ] Tests de parsers con fixtures reales del backend
- [ ] Documentar todos los endpoints en `docs/backend-endpoints.md`

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
