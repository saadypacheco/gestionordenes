/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Paleta outdoor-first — AGENTS.md §4
        brand: {
          primary: '#1E40AF',   // Blue 800
          accent: '#F59E0B',    // Amber 500
        },
        state: {
          success: '#16A34A',   // Green 600 — sincronizado, cerrada OK
          warning: '#EA580C',   // Orange 600 — pendiente de sync
          danger: '#DC2626',    // Red 600 — error, anulada
          progress: '#0891B2',  // Cyan 600 — en curso (estadoId=15)
        },
        surface: {
          bg: '#F8FAFC',        // Slate 50
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E8F0',   // Slate 200
        },
        text: {
          primary: '#0F172A',   // Slate 900
          secondary: '#475569', // Slate 600
          muted: '#94A3B8',     // Slate 400
        },
        // Dark mode (tokens definidos pero no aplicados todavía — AGENTS.md §12 pendientes)
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          text: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
};
