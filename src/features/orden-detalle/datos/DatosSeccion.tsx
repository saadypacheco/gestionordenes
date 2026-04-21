import { Text, View } from 'react-native';
import type { ReactNode } from 'react';

type Props = {
  titulo: string;
  children: ReactNode;
};

export function DatosSeccion({ titulo, children }: Props) {
  return (
    <View className="mb-4 overflow-hidden rounded-xl bg-surface-card">
      <View className="border-b border-border bg-border/30 px-3 py-2">
        <Text className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          {titulo}
        </Text>
      </View>
      <View className="px-3">{children}</View>
    </View>
  );
}
