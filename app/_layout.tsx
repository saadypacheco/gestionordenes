import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useDbMigrations } from '@/db/migrate';
import {
  useAuthInitializing,
  useBootstrapSession,
  useUsuario,
} from '@/features/auth/useSession';

/**
 * Root layout:
 *  1. Corre migraciones de la DB antes de montar UI real.
 *  2. Bootstrap de la sesión persistida (usuario + fecha).
 *  3. Guard: redirige a /login o /(tabs) según haya usuario logueado.
 */
export default function RootLayout() {
  const { success: migrationsReady, error: migrationsError } = useDbMigrations();

  // Bootstrap se lanza cuando las migraciones están listas
  return (
    <>
      {migrationsError ? (
        <MigrationErrorScreen error={migrationsError} />
      ) : !migrationsReady ? (
        <LoadingScreen mensaje="Preparando almacenamiento…" />
      ) : (
        <AppReady />
      )}
      <StatusBar style="light" />
    </>
  );
}

function AppReady() {
  // Hooks de sesión solo corren cuando la DB está lista
  useBootstrapSession();
  const initializing = useAuthInitializing();
  const usuario = useUsuario();
  const router = useRouter();
  const segments = useSegments();

  // Guard: redirigir según haya sesión
  useEffect(() => {
    if (initializing) return;

    const enLogin = segments[0] === 'login';
    if (!usuario && !enLogin) {
      router.replace('/login');
    } else if (usuario && enLogin) {
      router.replace('/(tabs)');
    }
  }, [initializing, usuario, segments, router]);

  if (initializing) {
    return <LoadingScreen mensaje="Cargando sesión…" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="orden/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

function LoadingScreen({ mensaje }: { mensaje: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-brand-primary">
      <ActivityIndicator size="large" color="#ffffff" />
      <Text className="mt-4 text-white/80">{mensaje}</Text>
    </View>
  );
}

function MigrationErrorScreen({ error }: { error: Error }) {
  return (
    <View className="flex-1 items-center justify-center bg-state-danger px-6">
      <Text className="text-lg font-semibold text-white">Error al preparar la app</Text>
      <Text className="mt-2 text-center text-sm text-white/90">{error.message}</Text>
      <Text className="mt-4 text-center text-xs text-white/70">
        Cerrá y abrí la app. Si el problema persiste, contactá a soporte.
      </Text>
    </View>
  );
}
