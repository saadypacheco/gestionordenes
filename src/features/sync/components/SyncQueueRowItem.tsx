import { memo } from 'react';
import { Text, View } from 'react-native';
import { AlertTriangle, CloudUpload, ImageMinus, ImageUp } from 'lucide-react-native';
import type { SyncQueueRow } from '@/db/schema';
import { fechaHoraDisplay } from '@/lib/fecha';

type Props = {
  item: SyncQueueRow;
};

const ICONS = {
  grabar_orden: CloudUpload,
  subir_imagen: ImageUp,
  borrar_imagen: ImageMinus,
} as const;

const LABELS = {
  grabar_orden: 'Grabar orden',
  subir_imagen: 'Subir imagen',
  borrar_imagen: 'Borrar imagen',
} as const;

function SyncQueueRowImpl({ item }: Props) {
  const Icono = ICONS[item.tipo];
  const label = LABELS[item.tipo];
  const tieneError = item.intentos > 0 && item.ultimoError;

  return (
    <View className="rounded-xl border border-border bg-surface-card p-3">
      <View className="flex-row items-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10">
          <Icono size={16} color="#1E40AF" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-text-primary">{label}</Text>
          <Text className="text-xs text-text-secondary">
            Orden #{item.ordenId}
            {item.imagenId && ` · ${item.imagenId.slice(0, 8)}…`}
          </Text>
        </View>
        {item.intentos > 0 && (
          <View className="flex-row items-center rounded-md bg-state-warning/10 px-2 py-0.5">
            <Text className="text-xs font-semibold text-state-warning">
              {item.intentos} {item.intentos === 1 ? 'intento' : 'intentos'}
            </Text>
          </View>
        )}
      </View>

      {tieneError && (
        <View className="mt-2 flex-row items-start rounded-md bg-state-danger/10 p-2">
          <AlertTriangle size={12} color="#DC2626" />
          <Text className="ml-1.5 flex-1 text-xs text-state-danger" numberOfLines={2}>
            {item.ultimoError}
          </Text>
        </View>
      )}

      {item.lastAttemptAt && (
        <Text className="mt-1.5 text-[10px] text-text-muted">
          Último intento: {fechaHoraDisplay(item.lastAttemptAt)}
        </Text>
      )}
    </View>
  );
}

export const SyncQueueRowItem = memo(SyncQueueRowImpl);
