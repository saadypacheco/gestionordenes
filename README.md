# Gestión de Órdenes

App móvil para instaladores de campo. Reemplazo del legacy Ionic/Angular de 2021.

- **Documentación de producto y arquitectura**: [AGENTS.md](./AGENTS.md)
- **Reglas de trabajo con Claude Code**: [CLAUDE.md](./CLAUDE.md)
- **Decisiones técnicas**: [docs/decisiones.md](./docs/decisiones.md)
- **Estado de la migración**: [docs/progreso.md](./docs/progreso.md)
- **Contrato del backend legacy**: [docs/backend-endpoints.md](./docs/backend-endpoints.md)

## Stack

React Native 0.81 · Expo SDK 54 · TypeScript 5.9 · Expo Router · NativeWind 4 · Drizzle ORM + expo-sqlite · Zustand · TanStack Query.

## Desarrollo

```bash
pnpm install
pnpm start        # Metro bundler + Expo dev tools
pnpm android      # run on Android
pnpm ios          # run on iOS (mac only)
pnpm typecheck    # tsc --noEmit
pnpm lint         # expo lint
```

## Build

```bash
eas build --profile preview --platform android     # APK interno
eas build --profile production --platform android  # AAB para Play Store
eas build --profile production --platform ios      # iOS build
```

## Estructura

Ver [AGENTS.md §7](./AGENTS.md).

## Backend

El backend legacy vive en `http://alerthor.net:8777/api` y **no se modifica**.
Ver [docs/backend-endpoints.md](./docs/backend-endpoints.md) para el contrato completo.

## Legacy

El código Ionic/Angular original está en `ordenes20210128/` solo como referencia.
No se modifica ni se compila.
