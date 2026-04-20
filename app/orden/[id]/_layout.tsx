import { Tabs } from 'expo-router';

export default function OrdenTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        headerShown: false,
      }}
    >
      <Tabs.Screen name="tareas" options={{ title: 'Tareas' }} />
      <Tabs.Screen name="equipos" options={{ title: 'Equipos' }} />
      <Tabs.Screen name="recuperos" options={{ title: 'Recuperos' }} />
      <Tabs.Screen name="materiales" options={{ title: 'Materiales' }} />
      <Tabs.Screen name="comentarios" options={{ title: 'Comentarios' }} />
      <Tabs.Screen name="datos" options={{ title: 'Datos' }} />
      <Tabs.Screen name="galeria" options={{ title: 'Galería' }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
