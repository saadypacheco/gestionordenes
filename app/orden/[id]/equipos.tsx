import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Equipos() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // TODO Fase 6 — integrar src/features/orden-detalle/equipos + barcode scanner
  return (
    <View className="flex-1 bg-surface-bg p-4">
      <Text className="text-text-primary">Equipos de la orden {id} (placeholder)</Text>
    </View>
  );
}
