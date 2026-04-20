import Constants from 'expo-constants';

/**
 * Config leída desde app.config.ts → expo.extra.
 * Fallback a valores seguros para que el arranque nunca rompa por env mal seteado.
 */
type Extra = {
  apiUrl?: string;
};

const extra: Extra = (Constants.expoConfig?.extra as Extra) ?? {};

export const env = {
  apiUrl: extra.apiUrl ?? 'http://alerthor.net:8777/api',
} as const;
