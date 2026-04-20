/**
 * Paleta y tokens de diseño — espejo del tailwind.config.js.
 * Usar desde código que necesite el valor hex directo (ej: iconos nativos, status bar).
 * Para estilos en JSX usar las classes de NativeWind.
 */

export const theme = {
  colors: {
    brand: {
      primary: '#1E40AF',
      accent: '#F59E0B',
    },
    state: {
      success: '#16A34A',
      warning: '#EA580C',
      danger: '#DC2626',
      progress: '#0891B2',
    },
    surface: {
      bg: '#F8FAFC',
      card: '#FFFFFF',
    },
    border: '#E2E8F0',
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#94A3B8',
    },
  },
} as const;
