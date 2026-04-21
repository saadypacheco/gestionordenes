import { useCallback, useMemo, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { Images } from 'lucide-react-native';

import type { OrdenImagen } from '@/domain/orden';
import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { FotoThumb } from '@/features/orden-detalle/galeria/FotoThumb';
import { FotoModal } from '@/features/orden-detalle/galeria/FotoModal';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';

const COLUMNS = 3;
const PADDING = 12;
const GAP = 6;

export default function GaleriaTab() {
  const { orden } = useOrdenContext();
  const imagenes = orden?.imagenes ?? [];
  const { width } = useWindowDimensions();
  const [fotoActiva, setFotoActiva] = useState<OrdenImagen | null>(null);

  const thumbSize = useMemo(() => {
    const available = width - PADDING * 2 - GAP * (COLUMNS - 1);
    return Math.floor(available / COLUMNS);
  }, [width]);

  const abrir = useCallback((foto: OrdenImagen) => setFotoActiva(foto), []);
  const cerrar = useCallback(() => setFotoActiva(null), []);

  if (imagenes.length === 0) {
    return (
      <TabEmptyState
        icono={Images}
        titulo="Sin fotos"
        descripcion="No hay fotos asociadas a esta orden."
      />
    );
  }

  return (
    <View className="flex-1 bg-surface-bg">
      <FlatList
        data={imagenes}
        keyExtractor={(img) => img.imagenId}
        numColumns={COLUMNS}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{ padding: PADDING, gap: GAP }}
        renderItem={({ item }) => (
          <FotoThumb foto={item} sizePx={thumbSize} onPress={abrir} />
        )}
      />
      <FotoModal foto={fotoActiva} onClose={cerrar} />
    </View>
  );
}
