import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        headerShown: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Mis Órdenes' }} />
      <Tabs.Screen name="sync" options={{ title: 'Sincronizar' }} />
    </Tabs>
  );
}
