import { FlatList } from 'react-native';
import { PackageSearch } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { EquipoRow } from '@/features/orden-detalle/equipos/EquipoRow';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';

export default function RecuperosTab() {
  const { orden } = useOrdenContext();
  const recuperos = orden?.recuperos ?? [];

  if (recuperos.length === 0) {
    return (
      <TabEmptyState
        icono={PackageSearch}
        titulo="Sin recuperos"
        descripcion="Todavía no se registraron equipos recuperados."
      />
    );
  }

  return (
    <FlatList
      data={recuperos}
      keyExtractor={(e, i) => `${e.imagenId ?? e.equipoId ?? 'r'}-${i}`}
      contentContainerStyle={{ padding: 12, gap: 8 }}
      renderItem={({ item }) => <EquipoRow equipo={item} contexto="recuperado" />}
    />
  );
}
