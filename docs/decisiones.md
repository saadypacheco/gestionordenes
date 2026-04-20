# Decisiones del proyecto

Registro cronológico de decisiones no obvias con su racional.
Formato: fecha → decisión → alternativas consideradas → motivo.

---

## 2026-04-20 — Stack: React Native + Expo + TypeScript

**Alternativas consideradas:** Flutter, Ionic + Capacitor, Android nativo (Kotlin), Next.js PWA.

**Motivo:**
- Ionic descartado explícitamente por el usuario.
- PWA no sirve: cámara + barcode + offline + distribución APK son requeridos.
- Flutter ganaba en performance pura, pero rompe coherencia TypeScript con los otros 3 repos del usuario (`betamigos`, `tienda`, `solucionesdentales`).
- Kotlin nativo es overkill sin requerimientos de integración nativa compleja.
- RN + Expo cubre 1:1 los plugins Cordova del legacy (`expo-camera`, `expo-barcode-scanner`, `expo-sqlite`, `expo-file-system`, `expo-network`, `expo-secure-store`) con menos fricción de build (EAS).

---

## 2026-04-20 — Gestor de paquetes: pnpm

**Alternativas:** npm, yarn.

**Motivo:** lockfile determinista, instalación rápida, ya usado en otros repos del usuario.

---

## 2026-04-20 — Navegación: Expo Router (file-based)

**Alternativas:** React Navigation (tradicional).

**Motivo:** el mapa del legacy tiene 9 pantallas claramente jerárquicas (login → tabs → orden/[id]/{7 tabs}). File-based clarifica el árbol, habilita deep links naturales y reduce boilerplate de config de rutas.

---

## 2026-04-20 — Estado: Zustand + TanStack Query

**Alternativas:** Redux, Jotai, Context API, solo TanStack Query.

**Motivo:**
- Zustand para sesión/UI state porque es el store del resto de proyectos del usuario.
- TanStack Query para la capa de datos server: retry, invalidación, caché, buen mental model para "offline-first con refetch al volver la red".

---

## 2026-04-20 — DB local: expo-sqlite + Drizzle ORM

**Alternativas:** WatermelonDB, AsyncStorage puro, expo-sqlite directo.

**Motivo:**
- El modelo es relacional (ordenes ← tareas/equipos/materiales/imágenes) → SQLite es natural.
- Drizzle da tipos autogenerados desde el schema → elimina bugs de mapeo.
- Migraciones versionadas desde el día 1 → el schema va a evolucionar.
- WatermelonDB es potente pero agrega complejidad innecesaria para el scope actual.

---

## 2026-04-20 — Estilos: NativeWind 4 + Lucide + Inter

**Alternativas:** StyleSheet nativo, Tamagui, RN Paper.

**Motivo:**
- NativeWind replica Tailwind en RN → misma DX que los proyectos web del usuario.
- Lucide tiene set completo, tree-shakeable y es el que usan los otros repos.
- Inter variable font pesa poco y es muy legible en outdoor.

---

## 2026-04-20 — Plataformas: Android 7.0 (API 24) + iOS 15.1

**Requerimiento:** soportar celulares de hasta 10 años.

**Motivo:**
- Android 7.0 salió en agosto de 2016 (~10 años). Es además el mínimo de Expo SDK 52.
- iOS 15.1 corre en iPhone 6s (2015). Es el mínimo de Expo SDK 52.
- Bajar más (Android 6, iOS 14) implicaría downgrade del SDK de Expo — no vale la pena.

---

## 2026-04-20 — HTTPS: cleartext acotado a alerthor.net

**Problema:** Android 9+ bloquea HTTP por default. El backend legacy está en `http://alerthor.net:8777`.

**Alternativas:** migrar backend a HTTPS, proxy intermedio, declarar cleartext global.

**Motivo:** el backend no se toca. Se declara `usesCleartextTraffic: true` + `networkSecurityConfig` con dominio **específico** (`alerthor.net`) → todo el resto del tráfico de la app queda forzado a HTTPS. Compromiso aceptable mientras no se migre el backend.

**Deuda técnica:** queda registrada para el día que el backend soporte TLS.

---

## 2026-04-20 — Auth: alias + pass sin token (por ahora)

**Motivo:** el backend legacy no emite JWT ni sesión server-side. El endpoint `/usuarios/login` devuelve datos del usuario y listo.

**Cambios vs legacy:**
- El legacy guarda `xpass` en plano en `@ionic/storage`. Eso se **corrige**: se guarda un hash derivado (solo para validar el fallback offline del día) en `expo-secure-store`.
- La password real no queda persistida en disco.

**Pendiente:** migrar a un esquema con token cuando el backend lo soporte. Documentar en §12.

---

## 2026-04-20 — Calidad de fotos: 1600 px + JPEG quality 70

**Motivo:** balance entre calidad visual suficiente para documentar una instalación y tamaño de archivo transferible en redes lentas.

**Referencia:** el legacy usa `quality: 40` sin resize → pierde detalle visible y aún así genera archivos grandes en cámaras modernas. Con 1600 px + quality 70, los archivos quedan en ~150–350 KB, que es lo que un 3G aguanta sin timeout.

**Implementación:** `expo-image-manipulator` corre después de tomar la foto y antes de persistir.

---

## 2026-04-20 — Diseño: modernización (no rediseño)

**Motivo:** el instalador ya conoce el modelo mental del legacy (tabs arriba, lista de órdenes, FAB para agregar, 7 sub-tabs en el detalle). Cambiar la estructura lo forzaría a re-aprender. Cambian: paleta, tipografía, iconos, densidad, microinteracciones. **No cambia**: jerarquía de navegación ni vocabulario.

**Paleta nueva:** documentada en `AGENTS.md` §4. Outdoor-first (alto contraste, sin dark-mode dependiente).

---

## 2026-04-20 — Features nuevas: GPS + firma + timestamps

Se agregan sin tocar el contrato del backend:
- **GPS** usa el campo `Ubicacion` de la cabecera (ya existe, es texto libre — le metemos `"lat,lng"`).
- **Timestamps** van dentro de `datos_extra` (JSON ya existente en `partidos`/`ordenes`).
- **Firma** se sube por `/ordenes/guardarImagen` con un metadata local `tipo='firma'` que la diferencia de fotos comunes.

Cero cambios requeridos en el backend — por diseño.
