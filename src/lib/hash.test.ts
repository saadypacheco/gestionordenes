import { derivarHashLogin, matchHashLogin } from './hash';

/**
 * Mock de expo-crypto — Jest no corre en un environment con WebCrypto real.
 * Implementación simple: SHA-256 vía Node crypto en hex para matchear el
 * shape que devuelve expo-crypto.
 */
jest.mock('expo-crypto', () => {
  const nodeCrypto: typeof import('crypto') = jest.requireActual('crypto');
  return {
    CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
    CryptoEncoding: { HEX: 'hex' },
    digestStringAsync: async (_algo: string, input: string, _opts: unknown) =>
      nodeCrypto.createHash('sha256').update(input).digest('hex'),
  };
});

describe('derivarHashLogin', () => {
  it('devuelve un hex de 64 chars (SHA-256)', async () => {
    const h = await derivarHashLogin('juan', '1234');
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });

  it('es determinístico — mismo input → mismo output', async () => {
    const a = await derivarHashLogin('juan', '1234');
    const b = await derivarHashLogin('juan', '1234');
    expect(a).toBe(b);
  });

  it('normaliza el alias (trim + lowercase) antes del hash', async () => {
    const a = await derivarHashLogin('juan', '1234');
    const b = await derivarHashLogin('  Juan  ', '1234');
    expect(a).toBe(b);
  });

  it('NO normaliza la password — respeta mayúsculas y espacios', async () => {
    const a = await derivarHashLogin('juan', '1234');
    const b = await derivarHashLogin('juan', '1234 ');
    expect(a).not.toBe(b);
    const c = await derivarHashLogin('juan', 'abcd');
    expect(a).not.toBe(c);
  });

  it('dos usuarios distintos con la misma password → hashes distintos', async () => {
    const h1 = await derivarHashLogin('juan', '1234');
    const h2 = await derivarHashLogin('maria', '1234');
    expect(h1).not.toBe(h2);
  });
});

describe('matchHashLogin', () => {
  it('true cuando alias+pass genera el mismo hash', async () => {
    const h = await derivarHashLogin('juan', '1234');
    expect(await matchHashLogin('juan', '1234', h)).toBe(true);
  });

  it('false cuando la pass es distinta', async () => {
    const h = await derivarHashLogin('juan', '1234');
    expect(await matchHashLogin('juan', 'otra', h)).toBe(false);
  });

  it('false cuando el hash guardado es arbitrario', async () => {
    expect(await matchHashLogin('juan', '1234', 'no-es-un-hash')).toBe(false);
  });
});
