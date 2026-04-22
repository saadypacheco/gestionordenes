import { z } from 'zod';

/**
 * Validación del form de alta manual de equipo instalado.
 * El nroSerie es el único campo obligatorio — la descripción y el estado de
 * abonado pueden venir del catálogo `cat_equipos` si el nroSerie matchea.
 */
export const equipoFormSchema = z.object({
  nroSerie: z
    .string()
    .trim()
    .min(3, 'Ingresá un número de serie válido (mínimo 3 caracteres)')
    .max(64, 'Número de serie demasiado largo'),
  descripcion: z.string().trim().max(200, 'Descripción demasiado larga').optional(),
  abonado: z.boolean().optional(),
});

export type EquipoFormInput = z.infer<typeof equipoFormSchema>;

/**
 * Normaliza un código escaneado: saca whitespace, uppercase para que el match
 * contra el catálogo sea consistente con lo que guarda el backend.
 */
export function normalizarNroSerie(raw: string): string {
  return raw.trim().toUpperCase();
}
