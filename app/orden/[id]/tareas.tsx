import { FlatList } from 'react-native';
import { ListChecks } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { TareaRow } from '@/features/orden-detalle/tareas/TareaRow';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';

export default function TareasTab() {
  const { orden } = useOrdenContext();
  const tareas = orden?.tareas ?? [];

  if (tareas.length === 0) {
    return (
      <TabEmptyState
        icono={ListChecks}
        titulo="Sin tareas"
        descripcion="Esta orden no tiene tareas asignadas."
      />
    );
  }

  return (
    <FlatList
      data={tareas}
      keyExtractor={(t) => String(t.tareaId)}
      contentContainerStyle={{ padding: 12, gap: 8 }}
      renderItem={({ item }) => <TareaRow tarea={item} />}
    />
  );
}
