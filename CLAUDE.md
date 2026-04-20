# CLAUDE.md — Gestión de Órdenes

> Este archivo lo lee Claude Code en cada sesión.
> Contiene reglas de trabajo, no lógica del proyecto (eso está en `AGENTS.md`).

---

## Archivos clave

| Archivo | Qué contiene |
|---------|-------------|
| `AGENTS.md` | Visión, stack, módulos, modelo de datos, reglas críticas, decisiones pendientes |
| `docs/progreso.md` | Estado actual: qué está hecho, en progreso, bloqueado |
| `docs/decisiones.md` | Por qué se eligió X sobre Y (crear al tomar decisiones no obvias) |
| `docs/backend-endpoints.md` | Detalle exhaustivo de endpoints, payloads y quirks del backend |
| `ordenes20210128/` | Legacy Ionic/Angular — solo referencia, NO se modifica |

---

## Cómo trabajamos

### Antes de escribir código
- Leer siempre el archivo antes de editarlo.
- Si el cambio toca más de 2 archivos, confirmar el approach primero.
- Si hay ambigüedad en el requerimiento, preguntar antes de asumir.
- Si el tema toca una decisión pendiente del §12 de `AGENTS.md`, **pedir la decisión primero** — no asumir.

### Al escribir código
- Seguir las convenciones de `AGENTS.md` §8.
- Respetar las reglas críticas de `AGENTS.md` §9 sin excepción.
- No agregar dependencias sin confirmar con el usuario.
- No crear archivos de documentación salvo que se pida explícitamente.
- No refactorizar código adyacente que no fue pedido.

### Al terminar una tarea
- Actualizar `docs/progreso.md` marcando lo completado.
- Si se tomó una decisión no obvia, agregarla a `docs/decisiones.md`.
- Si se descubrió un quirk nuevo del backend, documentarlo en `docs/backend-endpoints.md`.

---

## Lo que NO hacer

- ❌ No modificar el backend (URLs, payloads, casing).
- ❌ No traducir código Angular/Ionic línea a línea — migramos **comportamiento**, no sintaxis.
- ❌ No usar Ionic / Capacitor (descartado).
- ❌ No hacer `DELETE` físico en la DB local — siempre soft delete.
- ❌ No guardar contraseñas en plano.
- ❌ No bloquear la UI con sincronización — fire-and-forget.
- ❌ No commitear archivos `.env` ni credenciales.
- ❌ No subir el APK firmado al repo.
- ❌ No tocar la carpeta `ordenes20210128/`.

---

## Orden de implementación acordado

Definido en `AGENTS.md` §11. Resumen:

1. Scaffold Expo + TS + Expo Router + NativeWind
2. Config app.config.ts + eas.json
3. HTTP client + parsers del backend legacy
4. DB local (Drizzle) con schema y repositorios
5. Auth (online + fallback offline)
6. Listado de órdenes
7. Detalle — tab Tareas
8. Detalle — resto de tabs
9. Cámara + Galería con upload diferido
10. Barcode scanner
11. Sincronización on-demand + background
12. EAS Build APK
13. Hardening + Sentry

> Cada fase arranca cuando se cierra la anterior. No paralelizar fases sin confirmar.

---

## Entorno de desarrollo

- Runtime: Node 20 LTS, pnpm 9.x (o el gestor que se confirme en §12.E).
- Dev server: `pnpm start` → Expo Dev Tools (QR para Expo Go o dev build).
- Type check: `pnpm typecheck` (tsc --noEmit).
- Lint: `pnpm lint` (ESLint + Prettier).
- Tests: `pnpm test`.
- Build APK preview: `eas build --profile preview --platform android`.
- Build APK prod: `eas build --profile production --platform android`.

> Scripts concretos se definen al crear `package.json`.

---

## Backend

- Base URL: `http://alerthor.net:8777/api` (según legacy — confirmar en §12.C).
- Endpoints documentados en `docs/backend-endpoints.md` (a crear junto al wrapper HTTP).
- El cliente **normaliza** los quirks — nunca se pide al backend que cambie.

---

## Git workflow

Inspirado en el patrón de `tienda` (el más maduro de los 3 repos de referencia).

### Branches

- `main` — **producción**. Cada push dispara EAS build (APK preview). Solo llega acá por PR desde `develop` con CI verde.
- `develop` — **integración**. Todo trabajo termina acá primero. Push o PR a `develop` dispara CI (lint + typecheck + tests).
- `feature/<nombre>` — feature nueva, parte de `develop`.
- `fix/<descripcion>` — bug fix, parte de `develop`.
- `chore/<tarea>` — tareas de infra / housekeeping, parte de `develop`.

### Flujo estándar

```
feature/xxx ──PR──► develop ──PR──► main ──trigger──► EAS build ──► APK link en expo.dev
```

1. `git checkout develop && git pull`
2. `git checkout -b feature/mi-cosa`
3. Commits: `feat(módulo): descripción en infinitivo` (es-AR OK).
4. Push a `origin feature/mi-cosa` → abrir PR a `develop` (template en `.github/pull_request_template.md`).
5. CI corre lint + typecheck + tests. Si falla, no se mergea.
6. Merge a `develop`. Periódicamente, PR `develop → main` cuando hay un hito listo.
7. Merge a `main` dispara `release.yml` → EAS build preview → APK shareable.

### Reglas duras

- ❌ **No push directo a `main`** ni a `develop`. Todo vía PR.
- ❌ No mergear PRs con CI rojo.
- ❌ No `--force push` a `main` ni `develop` nunca.
- ✅ Rebase local antes del push (`git pull --rebase origin develop`).
- ✅ Commits atómicos (un concepto por commit).

### CI (ver `.github/workflows/`)

- `ci.yml` — corre en PRs a `main`/`develop` y en push a `develop`. Ejecuta `typecheck`, `lint`, `test:ci`.
- `release.yml` — corre en push a `main` y manual (`workflow_dispatch`). Quality gate (tests) → `eas build --profile preview --platform android --no-wait`. Requiere secret `EXPO_TOKEN`.

### Dónde ver el APK de una versión de `main`

1. Dashboard EAS: https://expo.dev/accounts/saadypacheco/projects/gestion-ordenes/builds
2. Cada build tiene URL compartible + QR para instalar en el celular.
3. Los logs del job `build` en GitHub Actions también imprimen el URL.

### Tests

- `pnpm test` — corre Jest local.
- `pnpm test:watch` — modo watch.
- `pnpm test:ci` — modo CI (`--ci --passWithNoTests`).
- Tests obligatorios en: `src/api/parsers.ts`, `src/db/repositories/*`, `src/features/sync/*`, cualquier cosa que toque el contrato legacy del backend.

---

## Repo

https://github.com/saadypacheco/gestionordenes

- EAS dashboard: https://expo.dev/accounts/saadypacheco/projects/gestion-ordenes
