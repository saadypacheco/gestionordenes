import { Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

type Props = {
  icono: LucideIcon;
  titulo: string;
  descripcion?: string;
};

export function TabEmptyState({ icono: Icono, titulo, descripcion }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-6 py-16">
      <View className="mb-3 h-14 w-14 items-center justify-center rounded-full bg-border">
        <Icono size={24} color="#475569" />
      </View>
      <Text className="text-center text-base font-semibold text-text-primary">{titulo}</Text>
      {descripcion && (
        <Text className="mt-1 text-center text-sm text-text-secondary">{descripcion}</Text>
      )}
    </View>
  );
}
