import { imagenToUri } from './imagen';

describe('imagenToUri', () => {
  it('devuelve null si imagen es null', () => {
    expect(imagenToUri({ imagen: null, mimeType: 'image/jpeg' })).toBeNull();
  });

  it('devuelve null si imagen es string vacío', () => {
    expect(imagenToUri({ imagen: '', mimeType: null })).toBeNull();
    expect(imagenToUri({ imagen: '   ', mimeType: null })).toBeNull();
  });

  it('pass-through para file:// URIs', () => {
    expect(
      imagenToUri({ imagen: 'file:///data/user/0/app/foo.jpg', mimeType: null }),
    ).toBe('file:///data/user/0/app/foo.jpg');
  });

  it('pass-through para https:// URIs', () => {
    expect(imagenToUri({ imagen: 'https://cdn.ex.com/foo.jpg', mimeType: null })).toBe(
      'https://cdn.ex.com/foo.jpg',
    );
  });

  it('pass-through para data: URIs', () => {
    const data = 'data:image/png;base64,iVBORw0K';
    expect(imagenToUri({ imagen: data, mimeType: null })).toBe(data);
  });

  it('arma data URI con mimeType provisto', () => {
    expect(imagenToUri({ imagen: 'iVBORw0K', mimeType: 'image/png' })).toBe(
      'data:image/png;base64,iVBORw0K',
    );
  });

  it('default a image/jpeg si mimeType es null', () => {
    expect(imagenToUri({ imagen: '/9j/4AAQ', mimeType: null })).toBe(
      'data:image/jpeg;base64,/9j/4AAQ',
    );
  });
});
