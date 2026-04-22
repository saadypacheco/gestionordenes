import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { Boxes, Plus } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { EquipoRow } from '@/features/orden-detalle/equipos/EquipoRow';
import { AgregarEquipoModal } from '@/features/orden-detalle/equipos/AgregarEquipoModal';
import { useEquiposMutations } from '@/features/orden-detalle/equipos/useEquiposMutations';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';
import { FAB } from '@/features/orden-detalle/components/FAB';

export default function EquiposTab() {
  const { orden } = useOrdenContext();
  const { quitar } = useEquiposMutations();
  const [modalVisible, setModalVisible] = useState(false);

  const equipos = useMemo(() => orden?.equipos ?? [], [orden?.equipos]);

  const confirmarQuitar = useCallback(
    (index: number) => {
      const eq = equipos[index];
      if (!eq) return;
      const label = eq.nroSerie ?? eq.descripcion ?? `equipo #${index + 1}`;
      Alert.alert('Quitar equipo', `¿Quitar ${label} de esta orden?`, [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Quitar',
          style: 'destructive',
          onPress: () => {
            quitar(index).catch(() => {
              /* error manejado en el hook */
            });
          },
        },
      ]);
    },
    [equipos, quitar],
  );

  return (
    <View className="flex-1 bg-surface-bg">
      {equipos.length === 0 ? (
        <TabEmptyState
          icono={Boxes}
          titulo="Sin equipos"
          descripcion="Tocá el botón + para agregar un equipo instalado."
        />
      ) : (
        <FlatList
          data={equipos}
          keyExtractor={(e, i) => `${e.imagenId ?? e.equipoId ?? e.nroSerie ?? 'i'}-${i}`}
          contentContainerStyle={{ padding: 12, paddingBottom: 96, gap: 8 }}
          renderItem={({ item, index }) => (
            <EquipoRow
              equipo={item}
              contexto="instalado"
              onDelete={() => confirmarQuitar(index)}
            />
          )}
        />
      )}

      <FAB
        icono={Plus}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Agregar equipo"
      />

      <AgregarEquipoModal
        visible={modalVisible}
        onCerrar={() => setModalVisible(false)}
      />
    </View>
  );
}
