## Qué cambia

<!-- Resumen en 1-3 bullets. Enfoque en el *qué* y el *por qué*, no en el *cómo*. -->

## Test plan

<!-- Cómo validar manualmente que esto funciona en un device o emulador. -->
- [ ] `pnpm typecheck` verde
- [ ] `pnpm test:ci` verde
- [ ] `pnpm lint` verde
- [ ] Probado en Android (emulador o device) — flujo <describir>
- [ ] Probado offline (modo avión) si aplica al feature
- [ ] Probado sin permisos (cámara/ubicación) si aplica

## Impacto

- [ ] Toca el backend / contrato legacy (si sí — ¿por qué, si se suponía que no se modifica?)
- [ ] Cambia el modelo de datos local (Drizzle schema + migración)
- [ ] Cambia permisos nativos (app.json plugins)
- [ ] Requiere un nuevo build de EAS (no solo OTA update)

## Checklist

- [ ] Seguí `AGENTS.md` §8 (convenciones) y §9 (reglas críticas)
- [ ] Actualicé `docs/progreso.md` si cerré una fase o feature
- [ ] Registré decisiones no obvias en `docs/decisiones.md`
- [ ] No agregué dependencias sin discutirlas
- [ ] No dejé `console.log` / TODOs sin marcar

---
🤖 Escrito con ayuda de [Claude Code](https://claude.com/claude-code)
