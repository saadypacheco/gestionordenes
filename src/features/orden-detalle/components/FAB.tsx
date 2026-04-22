import { Pressable, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

type Props = {
  icono: LucideIcon;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
};

export function FAB({ icono: Icono, onPress, accessibilityLabel, disabled }: Props) {
  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-4 right-4"
      style={{ elevation: 6 }}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        className="h-14 w-14 items-center justify-center rounded-full bg-brand-primary shadow-lg active:opacity-80 disabled:opacity-50"
      >
        <Icono size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
