import { View } from 'react-native';
import { Tabs, useLocalSearchParams } from 'expo-router';

import { OrdenProvider, useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { HeaderOrden } from '@/features/orden-detalle/components/HeaderOrden';
import { DetalleLoading } from '@/features/orden-detalle/components/DetalleLoading';
import { DetalleNotFound } from '@/features/orden-detalle/components/DetalleNotFound';

export default function OrdenTabsLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ordenId = id ? Number(id) : null;

  return (
    <OrdenProvider ordenId={ordenId}>
      <Gate />
    </OrdenProvider>
  );
}

function Gate() {
  const { orden, loading, notFound } = useOrdenContext();

  if (loading) return <DetalleLoading />;
  if (notFound || !orden) return <DetalleNotFound />;

  return (
    <View className="flex-1 bg-surface-bg">
      <HeaderOrden orden={orden} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1E40AF',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarLabelStyle: { fontSize: 11 },
          tabBarStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Tabs.Screen name="tareas" options={{ title: 'Tareas' }} />
        <Tabs.Screen name="equipos" options={{ title: 'Equipos' }} />
        <Tabs.Screen name="recuperos" options={{ title: 'Recuperos' }} />
        <Tabs.Screen name="materiales" options={{ title: 'Materiales' }} />
        <Tabs.Screen name="comentarios" options={{ title: 'Coments.' }} />
        <Tabs.Screen name="datos" options={{ title: 'Datos' }} />
        <Tabs.Screen name="galeria" options={{ title: 'Galería' }} />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </View>
  );
}
