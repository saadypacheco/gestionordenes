import { equipoFormSchema, normalizarNroSerie } from './validators';

describe('equipoFormSchema', () => {
  it('acepta un nroSerie válido solo', () => {
    const res = equipoFormSchema.safeParse({ nroSerie: 'ABC123' });
    expect(res.success).toBe(true);
  });

  it('recorta whitespace del nroSerie', () => {
    const res = equipoFormSchema.safeParse({ nroSerie: '  ABC123  ' });
    expect(res.success).toBe(true);
    if (res.success) expect(res.data.nroSerie).toBe('ABC123');
  });

  it('rechaza nroSerie de menos de 3 caracteres', () => {
    const res = equipoFormSchema.safeParse({ nroSerie: 'AB' });
    expect(res.success).toBe(false);
  });

  it('rechaza nroSerie de más de 64 caracteres', () => {
    const res = equipoFormSchema.safeParse({ nroSerie: 'A'.repeat(65) });
    expect(res.success).toBe(false);
  });

  it('acepta descripción vacía', () => {
    expect(
      equipoFormSchema.safeParse({ nroSerie: 'ABC123', descripcion: '' }).success,
    ).toBe(true);
  });

  it('rechaza descripción de más de 200 chars', () => {
    const res = equipoFormSchema.safeParse({
      nroSerie: 'ABC123',
      descripcion: 'x'.repeat(201),
    });
    expect(res.success).toBe(false);
  });
});

describe('normalizarNroSerie', () => {
  it('hace trim + uppercase', () => {
    expect(normalizarNroSerie('  abc-123  ')).toBe('ABC-123');
  });

  it('no altera un string ya normalizado', () => {
    expect(normalizarNroSerie('ABC-123')).toBe('ABC-123');
  });

  it('devuelve string vacío para input vacío', () => {
    expect(normalizarNroSerie('   ')).toBe('');
  });
});
