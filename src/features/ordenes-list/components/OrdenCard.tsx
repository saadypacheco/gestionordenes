import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronRight, CloudOff } from 'lucide-react-native';
import type { Orden } from '@/domain/orden';
import {
  formatoDireccion,
  labelEstadoOrden,
  tituloOrden,
  type EstadoLabel,
} from '@/lib/formato';

type Props = {
  orden: Orden;
  onPress: (ordenId: number) => void;
};

const toneClass: Record<EstadoLabel['tone'], { bg: string; text: string }> = {
  progress: { bg: 'bg-state-progress/10', text: 'text-state-progress' },
  success: { bg: 'bg-state-success/10', text: 'text-state-success' },
  danger: { bg: 'bg-state-danger/10', text: 'text-state-danger' },
  muted: { bg: 'bg-border', text: 'text-text-secondary' },
};

function OrdenCardImpl({ orden, onPress }: Props) {
  const estado = labelEstadoOrden(orden.estadoId);
  const tone = toneClass[estado.tone];

  return (
    <Pressable
      onPress={() => onPress(orden.ordenId)}
      accessibilityRole="button"
      accessibilityLabel={`Orden ${tituloOrden(orden)}, ${estado.label}`}
      className="flex-row items-center rounded-xl bg-surface-card p-4 shadow-sm active:opacity-70"
    >
      <View className="flex-1">
        <View className="mb-1 flex-row items-center">
          <Text className="flex-1 text-base font-semibold text-text-primary" numberOfLines={1}>
            {tituloOrden(orden)}
          </Text>
          {!orden.sincronizado && (
            <View
              accessibilityLabel="Orden con cambios sin sincronizar"
              className="ml-2 flex-row items-center rounded-full bg-state-warning/10 px-2 py-0.5"
            >
              <CloudOff size={12} color="#EA580C" />
              <Text className="ml-1 text-[10px] font-medium text-state-warning">Pendiente</Text>
            </View>
          )}
        </View>

        <Text className="text-sm text-text-secondary" numberOfLines={1}>
          {formatoDireccion(orden)}
        </Text>

        <View className="mt-2 flex-row items-center">
          <View className={`rounded-md px-2 py-0.5 ${tone.bg}`}>
            <Text className={`text-xs font-medium ${tone.text}`}>{estado.label}</Text>
          </View>
        </View>
      </View>

      <ChevronRight size={20} color="#94A3B8" />
    </Pressable>
  );
}

export const OrdenCard = memo(OrdenCardImpl);
