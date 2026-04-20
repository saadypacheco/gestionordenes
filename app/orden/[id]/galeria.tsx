import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Galeria() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // TODO Fase 7 — integrar src/features/orden-detalle/galeria con cámara + compresión + upload diferido
  return (
    <View className="flex-1 bg-surface-bg p-4">
      <Text className="text-text-primary">Galería de la orden {id} (placeholder)</Text>
    </View>
  );
}
