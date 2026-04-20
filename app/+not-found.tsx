import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'No encontrado' }} />
      <View className="flex-1 items-center justify-center bg-surface-bg p-6">
        <Text className="text-text-primary text-lg mb-4">Esta pantalla no existe.</Text>
        <Link href="/" className="text-brand-primary">
          Volver al inicio
        </Link>
      </View>
    </>
  );
}
