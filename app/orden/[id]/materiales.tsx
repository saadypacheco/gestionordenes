import { FlatList } from 'react-native';
import { Package } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { MaterialRow } from '@/features/orden-detalle/materiales/MaterialRow';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';

export default function MaterialesTab() {
  const { orden } = useOrdenContext();
  const materiales = orden?.materiales ?? [];

  if (materiales.length === 0) {
    return (
      <TabEmptyState
        icono={Package}
        titulo="Sin materiales"
        descripcion="No se cargaron materiales en esta orden."
      />
    );
  }

  return (
    <FlatList
      data={materiales}
      keyExtractor={(m, i) => `${m.materialId}-${i}`}
      contentContainerStyle={{ padding: 12, gap: 8 }}
      renderItem={({ item }) => <MaterialRow material={item} />}
    />
  );
}
