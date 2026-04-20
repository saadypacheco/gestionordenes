import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Tareas() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // TODO Fase 6 — integrar src/features/orden-detalle/tareas
  return (
    <View className="flex-1 bg-surface-bg p-4">
      <Text className="text-text-primary">Tareas de la orden {id} (placeholder)</Text>
    </View>
  );
}
