import { Text, View } from 'react-native';
import { ClipboardList } from 'lucide-react-native';

type Props = {
  online: boolean;
};

export function EmptyState({ online }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-6 py-16">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-border">
        <ClipboardList size={28} color="#475569" />
      </View>
      <Text className="text-center text-base font-semibold text-text-primary">
        No hay órdenes asignadas hoy
      </Text>
      {online ? (
        <Text className="mt-1 text-center text-sm text-text-secondary">
          Deslizá hacia abajo para refrescar.
        </Text>
      ) : (
        <Text className="mt-1 text-center text-sm text-text-secondary">
          Cuando vuelva la conexión las vas a ver acá.
        </Text>
      )}
    </View>
  );
}
