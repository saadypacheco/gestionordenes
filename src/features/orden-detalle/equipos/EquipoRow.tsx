import { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Hash, ImageOff, Trash2 } from 'lucide-react-native';
import type { OrdenEquipo } from '@/domain/orden';

type Props = {
  equipo: OrdenEquipo;
  /** Qué tipo de equipo es — sólo afecta el label del chip "abonado". */
  contexto?: 'instalado' | 'recuperado';
  /** Si se provee, muestra un botón de eliminar a la derecha. */
  onDelete?: () => void;
};

function EquipoRowImpl({ equipo, contexto = 'instalado', onDelete }: Props) {
  const descripcion =
    equipo.descripcion?.trim() ||
    (equipo.materialId !== null ? `Material #${equipo.materialId}` : 'Equipo sin descripción');

  const abonadoChip =
    equipo.abonado === null
      ? null
      : equipo.abonado
        ? { label: contexto === 'instalado' ? 'Abonado' : 'Era del abonado', tone: 'success' as const }
        : { label: 'No abonado', tone: 'muted' as const };

  return (
    <View className="flex-row items-center rounded-xl border border-border bg-surface-card p-3">
      <View className="mr-3 h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-border">
        {equipo.imagen ? (
          <Image source={{ uri: equipo.imagen }} className="h-full w-full" resizeMode="cover" />
        ) : (
          <ImageOff size={18} color="#94A3B8" />
        )}
      </View>

      <View className="flex-1">
        <Text className="text-sm font-medium text-text-primary" numberOfLines={2}>
          {descripcion}
        </Text>

        <View className="mt-1 flex-row flex-wrap items-center gap-2">
          {equipo.nroSerie && (
            <View className="flex-row items-center rounded-md bg-brand-primary/10 px-2 py-0.5">
              <Hash size={12} color="#1E40AF" />
              <Text className="ml-1 text-xs font-medium text-brand-primary">{equipo.nroSerie}</Text>
            </View>
          )}
          {abonadoChip && (
            <View
              className={`rounded-md px-2 py-0.5 ${
                abonadoChip.tone === 'success' ? 'bg-state-success/10' : 'bg-border'
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  abonadoChip.tone === 'success' ? 'text-state-success' : 'text-text-secondary'
                }`}
              >
                {abonadoChip.label}
              </Text>
            </View>
          )}
        </View>
      </View>

      {onDelete && (
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel="Quitar equipo"
          hitSlop={8}
          className="ml-2 h-9 w-9 items-center justify-center rounded-full active:bg-state-danger/10"
        >
          <Trash2 size={18} color="#DC2626" />
        </Pressable>
      )}
    </View>
  );
}

export const EquipoRow = memo(EquipoRowImpl);
