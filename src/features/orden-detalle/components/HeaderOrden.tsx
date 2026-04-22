import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CloudOff } from 'lucide-react-native';
import type { Orden } from '@/domain/orden';
import { formatoDireccion, labelEstadoOrden, tituloOrden, type EstadoLabel } from '@/lib/formato';
import { AccionesBar } from '../acciones/AccionesBar';

type Props = {
  orden: Orden;
};

const toneClass: Record<EstadoLabel['tone'], { bg: string; text: string }> = {
  progress: { bg: 'bg-state-progress/10', text: 'text-state-progress' },
  success: { bg: 'bg-state-success/10', text: 'text-state-success' },
  danger: { bg: 'bg-state-danger/10', text: 'text-state-danger' },
  muted: { bg: 'bg-border', text: 'text-text-secondary' },
};

export function HeaderOrden({ orden }: Props) {
  const router = useRouter();
  const estado = labelEstadoOrden(orden.estadoId);
  const tone = toneClass[estado.tone];

  const volver = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View className="border-b border-border bg-surface-card px-4 pb-3 pt-2">
      <View className="flex-row items-center">
        <Pressable
          onPress={volver}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={12}
          className="mr-2 p-1"
        >
          <ArrowLeft size={22} color="#0F172A" />
        </Pressable>
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

      <Text className="mt-1 text-sm text-text-secondary" numberOfLines={1}>
        {formatoDireccion(orden)}
      </Text>

      <View className="mt-2 flex-row items-center">
        <View className={`rounded-md px-2 py-0.5 ${tone.bg}`}>
          <Text className={`text-xs font-medium ${tone.text}`}>{estado.label}</Text>
        </View>
      </View>

      <View className="mt-3">
        <AccionesBar />
      </View>
    </View>
  );
}
