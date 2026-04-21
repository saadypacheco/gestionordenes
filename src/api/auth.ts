import { apiPost } from './client';
import { parseUsuario } from './parsers';
import type { Usuario } from '@/domain/usuario';

/**
 * POST /usuarios/login
 * Body: { xalias, xpass }
 * Response: [[{...}]] o [[]] si credenciales inválidas.
 *
 * Devuelve Usuario | null. El null lo propagamos como "credenciales inválidas"
 * y el hook `useLogin` (Fase 4) lo traduce a UI.
 */
export async function login(alias: string, pass: string): Promise<Usuario | null> {
  const raw = await apiPost<unknown>('/usuarios/login', { xalias: alias, xpass: pass });
  return parseUsuario(raw);
}
