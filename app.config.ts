import type { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Dynamic Expo config. Reads from EXPO_PUBLIC_API_URL when set (for staging/dev),
 * falls back to the production URL declared in app.json.
 *
 * Por qué existe este archivo:
 *  - app.json es estático; no puede leer variables de entorno.
 *  - app.config.ts se evalúa en cada build y puede inyectar valores por perfil de EAS.
 */
export default ({ config }: ConfigContext): ExpoConfig => {
  const apiUrl =
    process.env.EXPO_PUBLIC_API_URL ??
    (config.extra as any)?.apiUrl ??
    'http://alerthor.net:8777/api';

  return {
    ...(config as ExpoConfig),
    extra: {
      ...(config.extra ?? {}),
      apiUrl,
    },
  };
};
