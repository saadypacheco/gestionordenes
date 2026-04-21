import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';

export function DetalleNotFound() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-surface-bg px-6">
      <AlertTriangle size={32} color="#DC2626" />
      <Text className="mt-3 text-center text-base font-semibold text-text-primary">
        No encontramos la orden
      </Text>
      <Text className="mt-1 text-center text-sm text-text-secondary">
        Puede que haya sido borrada o que todavía no se haya sincronizado.
      </Text>
      <Pressable
        onPress={() => router.replace('/(tabs)')}
        accessibilityRole="button"
        className="mt-6 rounded-lg bg-brand-primary px-4 py-2 active:opacity-80"
      >
        <Text className="text-sm font-medium text-white">Volver al listado</Text>
      </Pressable>
    </View>
  );
}
