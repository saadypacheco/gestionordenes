import { memo } from 'react';
import { Text, View } from 'react-native';
import { Hash, Ruler } from 'lucide-react-native';
import type { OrdenMaterial } from '@/domain/orden';

type Props = {
  material: OrdenMaterial;
};

function formatoMedida(ini: number | null, fin: number | null): string | null {
  if (ini === null && fin === null) return null;
  if (ini !== null && fin !== null) return `${ini} → ${fin}`;
  return `${ini ?? fin}`;
}

function MaterialRowImpl({ material }: Props) {
  const medida = formatoMedida(material.medidaInicial, material.medidaFinal);
  const series = [material.nroSerie, material.nroSerieR]
    .filter((s): s is string => Boolean(s && s.trim().length > 0));

  return (
    <View className="rounded-xl border border-border bg-surface-card p-3">
      <View className="flex-row items-start">
        <View className="flex-1 pr-3">
          <Text className="text-sm font-medium text-text-primary" numberOfLines={2}>
            {material.descripcion || `Material #${material.materialId}`}
          </Text>
        </View>
        <View className="min-w-[52px] items-center rounded-md bg-border px-2 py-1">
          <Text className="text-[10px] uppercase tracking-wide text-text-secondary">Cant.</Text>
          <Text className="text-sm font-semibold text-text-primary">{material.cantidad}</Text>
        </View>
      </View>

      {(series.length > 0 || medida) && (
        <View className="mt-2 flex-row flex-wrap items-center gap-2">
          {series.map((s) => (
            <View
              key={s}
              className="flex-row items-center rounded-md bg-brand-primary/10 px-2 py-0.5"
            >
              <Hash size={12} color="#1E40AF" />
              <Text className="ml-1 text-xs font-medium text-brand-primary">{s}</Text>
            </View>
          ))}
          {medida && (
            <View className="flex-row items-center rounded-md bg-state-progress/10 px-2 py-0.5">
              <Ruler size={12} color="#0891B2" />
              <Text className="ml-1 text-xs font-medium text-state-progress">{medida}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export const MaterialRow = memo(MaterialRowImpl);
