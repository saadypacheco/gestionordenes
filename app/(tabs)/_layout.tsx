import { Alert, Pressable, Text, View } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';

import { useLogout } from '@/features/auth/useLogout';
import { useUsuario } from '@/features/auth/useSession';

export default function TabsLayout() {
  const router = useRouter();
  const logout = useLogout();
  const usuario = useUsuario();

  const confirmarLogout = () => {
    Alert.alert('Cerrar sesión', '¿Querés cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        headerShown: true,
        headerRight: () => (
          <View className="mr-3 flex-row items-center">
            {usuario && (
              <Text className="mr-3 text-sm text-text-secondary">
                {usuario.nombre}
              </Text>
            )}
            <Pressable
              onPress={confirmarLogout}
              accessibilityRole="button"
              accessibilityLabel="Cerrar sesión"
              hitSlop={8}
              className="p-1"
            >
              <LogOut size={20} color="#475569" />
            </Pressable>
          </View>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Mis Órdenes' }} />
      <Tabs.Screen name="sync" options={{ title: 'Sincronizar' }} />
    </Tabs>
  );
}
