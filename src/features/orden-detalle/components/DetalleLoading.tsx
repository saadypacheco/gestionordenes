import { ActivityIndicator, Text, View } from 'react-native';

type Props = {
  mensaje?: string;
};

export function DetalleLoading({ mensaje = 'Cargando orden…' }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-surface-bg">
      <ActivityIndicator color="#1E40AF" />
      <Text className="mt-3 text-sm text-text-secondary">{mensaje}</Text>
    </View>
  );
}
