import * as Crypto from 'expo-crypto';

/**
 * Derivación de la password del instalador para habilitar el fallback offline
 * del día SIN guardar la password en plano (corrección vs el legacy que la
 * guardaba plano en @ionic/storage).
 *
 * NO es para autenticar contra el backend — el backend sigue recibiendo la
 * password en claro en el body de /usuarios/login (limitación del backend legacy).
 * El hash vive solo en el device y sirve para "¿es la misma pass que usaste hoy?".
 *
 * Nivel de seguridad: SHA-256 de alias+pass. No es bcrypt/argon2 — si alguien
 * roba el teléfono desbloqueado y saca la DB, puede intentar brute force.
 * Tradeoff aceptable porque:
 *  - El phone suele tener lock screen
 *  - La app no guarda información sensible (solo órdenes del día)
 *  - El backend sigue siendo la fuente de verdad de la password
 *
 * Ver AGENTS.md §5 regla 5 y docs/decisiones.md (auth offline).
 */

/** Deriva un hash hex de alias+password. */
export async function derivarHashLogin(alias: string, password: string): Promise<string> {
  // `alias:password` para que dos usuarios con la misma pass no coincidan
  const input = `${alias.trim().toLowerCase()}:${password}`;
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, input, {
    encoding: Crypto.CryptoEncoding.HEX,
  });
}

/** True si alias+password coincide con el hash previamente guardado. */
export async function matchHashLogin(
  alias: string,
  password: string,
  hashGuardado: string,
): Promise<boolean> {
  const actual = await derivarHashLogin(alias, password);
  return actual === hashGuardado;
}
