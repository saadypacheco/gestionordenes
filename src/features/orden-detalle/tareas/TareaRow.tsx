import { memo } from 'react';
import { Text, View } from 'react-native';
import type { OrdenTarea } from '@/domain/orden';

type Props = {
  tarea: OrdenTarea;
};

function TareaRowImpl({ tarea }: Props) {
  return (
    <View className="flex-row items-center rounded-xl border border-border bg-surface-card p-3">
      <View className="flex-1 pr-3">
        <Text className="text-sm text-text-primary" numberOfLines={3}>
          {tarea.descripcion || `Tarea #${tarea.tareaId}`}
        </Text>
      </View>
      <View className="min-w-[48px] items-center rounded-md bg-border px-2 py-1">
        <Text className="text-[10px] uppercase tracking-wide text-text-secondary">Cant.</Text>
        <Text className="text-sm font-semibold text-text-primary">{tarea.cantidad}</Text>
      </View>
    </View>
  );
}

export const TareaRow = memo(TareaRowImpl);
