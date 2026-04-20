import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Recuperos() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // TODO Fase 6 — integrar src/features/orden-detalle/recuperos
  return (
    <View className="flex-1 bg-surface-bg p-4">
      <Text className="text-text-primary">Recuperos de la orden {id} (placeholder)</Text>
    </View>
  );
}
