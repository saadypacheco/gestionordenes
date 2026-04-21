import { FlatList } from 'react-native';
import { Boxes } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { EquipoRow } from '@/features/orden-detalle/equipos/EquipoRow';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';

export default function EquiposTab() {
  const { orden } = useOrdenContext();
  const equipos = orden?.equipos ?? [];

  if (equipos.length === 0) {
    return (
      <TabEmptyState
        icono={Boxes}
        titulo="Sin equipos"
        descripcion="Todavía no se registraron equipos instalados."
      />
    );
  }

  return (
    <FlatList
      data={equipos}
      keyExtractor={(e, i) => `${e.imagenId ?? e.equipoId ?? 'i'}-${i}`}
      contentContainerStyle={{ padding: 12, gap: 8 }}
      renderItem={({ item }) => <EquipoRow equipo={item} contexto="instalado" />}
    />
  );
}
