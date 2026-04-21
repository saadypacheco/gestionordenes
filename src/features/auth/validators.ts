import { z } from 'zod';

/**
 * Schema del form de login. Reglas:
 *  - alias: no vacío (trimmed)
 *  - password: no vacío
 * No forzamos longitud mínima ni complejidad porque el backend legacy no
 * tiene esas reglas — cualquier restricción adicional rompería logins válidos.
 */

export const loginSchema = z.object({
  xalias: z.string().trim().min(1, 'Ingresá el usuario'),
  xpass: z.string().min(1, 'Ingresá la contraseña'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
