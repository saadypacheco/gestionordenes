import { eq } from 'drizzle-orm';
import type { Usuario } from '@/domain/usuario';
import { db } from '../client';
import { usuarios, type UsuarioRow } from '../schema';

/**
 * Repositorio de sesión local. Guardamos 1 usuario a la vez (el logueado).
 * Fase 4 usa este repo para:
 *  - Persistir el usuario al loguearse OK contra backend
 *  - Verificar sesión existente al abrir la app
 *  - Validar fallback offline (alias + hash + fecha del día)
 */

function toRow(u: Usuario, passwordHash: string | null): UsuarioRow {
  return {
    usuarioId: u.usuarioId,
    nombre: u.nombre,
    apellido: u.apellido,
    instaladorId: u.instaladorId,
    movilId: u.movilId,
    avatar: u.avatar,
    fechaLogin: u.fecha,
    passwordHash,
    updatedAt: new Date().toISOString(),
  };
}

function fromRow(r: UsuarioRow): Usuario {
  return {
    usuarioId: r.usuarioId,
    nombre: r.nombre,
    apellido: r.apellido,
    instaladorId: r.instaladorId,
    movilId: r.movilId,
    avatar: r.avatar,
    fecha: r.fechaLogin,
  };
}

/** Guarda/actualiza el usuario logueado con su hash de password. */
export async function saveSesion(usuario: Usuario, passwordHash: string): Promise<void> {
  // Solo permitimos un usuario activo — borramos todos y reinsertamos
  await db.transaction(async (tx) => {
    await tx.delete(usuarios);
    await tx.insert(usuarios).values(toRow(usuario, passwordHash));
  });
}

/** Devuelve el usuario actualmente persistido (hay 0 o 1). */
export async function getSesion(): Promise<Usuario | null> {
  const [row] = await db.select().from(usuarios).limit(1);
  return row ? fromRow(row) : null;
}

/** Devuelve el hash de password guardado junto con la sesión (para fallback offline). */
export async function getSesionHash(): Promise<string | null> {
  const [row] = await db.select().from(usuarios).limit(1);
  return row?.passwordHash ?? null;
}

/** Devuelve la sesión + hash junto (evita 2 queries). */
export async function getSesionConHash(): Promise<{
  usuario: Usuario;
  passwordHash: string | null;
} | null> {
  const [row] = await db.select().from(usuarios).limit(1);
  if (!row) return null;
  return { usuario: fromRow(row), passwordHash: row.passwordHash };
}

/** Busca un usuario por alias+instaladorId — no usado por ahora, reservado. */
export async function findByUsuarioId(usuarioId: number): Promise<Usuario | null> {
  const [row] = await db.select().from(usuarios).where(eq(usuarios.usuarioId, usuarioId));
  return row ? fromRow(row) : null;
}

/** Logout: limpia la sesión persistida. Las órdenes y catálogos quedan. */
export async function clearSesion(): Promise<void> {
  await db.delete(usuarios);
}
