import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Camera, Images } from 'lucide-react-native';

import type { OrdenImagen } from '@/domain/orden';
import { MAX_FOTOS_POR_ORDEN } from '@/config/constants';
import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { FotoThumb } from '@/features/orden-detalle/galeria/FotoThumb';
import { FotoModal } from '@/features/orden-detalle/galeria/FotoModal';
import { CamaraModal } from '@/features/orden-detalle/galeria/CamaraModal';
import { useFotosMutations } from '@/features/orden-detalle/galeria/useFotosMutations';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';
import { FAB } from '@/features/orden-detalle/components/FAB';

const COLUMNS = 3;
const PADDING = 12;
const GAP = 6;

export default function GaleriaTab() {
  const { orden } = useOrdenContext();
  const { width } = useWindowDimensions();
  const [fotoActiva, setFotoActiva] = useState<OrdenImagen | null>(null);
  const [camaraVisible, setCamaraVisible] = useState(false);
  const { agregar, quitar, saving, error, llenasPorTope, totalFotos } =
    useFotosMutations();

  const imagenes = useMemo(
    () => (orden?.imagenes ?? []).filter((i) => (i.tipo ?? 'foto') !== 'firma'),
    [orden?.imagenes],
  );

  const thumbSize = useMemo(() => {
    const available = width - PADDING * 2 - GAP * (COLUMNS - 1);
    return Math.floor(available / COLUMNS);
  }, [width]);

  const abrir = useCallback((foto: OrdenImagen) => setFotoActiva(foto), []);
  const cerrar = useCallback(() => setFotoActiva(null), []);

  const abrirCamara = () => {
    if (llenasPorTope) {
      Alert.alert(
        'Límite de fotos',
        `Ya alcanzaste el máximo de ${MAX_FOTOS_POR_ORDEN} fotos por orden.`,
      );
      return;
    }
    setCamaraVisible(true);
  };

  const onConfirmarFoto = async (sourceUri: string) => {
    try {
      const { tope } = await agregar(sourceUri);
      setCamaraVisible(false);
      if (tope) {
        Alert.alert(
          'Límite alcanzado',
          `Solo se permiten ${MAX_FOTOS_POR_ORDEN} fotos por orden.`,
        );
      }
    } catch {
      Alert.alert('Error', error ?? 'No pudimos guardar la foto. Probá de nuevo.');
    }
  };

  const onEliminarFoto = (foto: OrdenImagen) => {
    const yaSubida = foto.subida === true;
    const mensaje = yaSubida
      ? '¿Eliminar esta foto? Se va a borrar también del servidor al sincronizar.'
      : '¿Eliminar esta foto?';
    Alert.alert('Eliminar foto', mensaje, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await quitar(foto);
            cerrar();
          } catch {
            Alert.alert('Error', error ?? 'No pudimos eliminar la foto.');
          }
        },
      },
    ]);
  };

  const Header = (
    <View className="flex-row items-center justify-between px-3 py-2">
      <Text className="text-xs text-text-secondary">
        {totalFotos} / {MAX_FOTOS_POR_ORDEN} fotos
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-surface-bg">
      {imagenes.length === 0 ? (
        <TabEmptyState
          icono={Images}
          titulo="Sin fotos"
          descripcion="Tocá el botón de cámara para registrar la instalación."
        />
      ) : (
        <FlatList
          data={imagenes}
          keyExtractor={(img) => img.imagenId}
          numColumns={COLUMNS}
          ListHeaderComponent={Header}
          columnWrapperStyle={{ gap: GAP, paddingHorizontal: PADDING }}
          contentContainerStyle={{ paddingBottom: 96, gap: GAP }}
          renderItem={({ item }) => (
            <FotoThumb foto={item} sizePx={thumbSize} onPress={abrir} />
          )}
        />
      )}

      <FAB
        icono={Camera}
        onPress={abrirCamara}
        accessibilityLabel="Tomar foto"
        disabled={saving}
      />

      <FotoModal foto={fotoActiva} onClose={cerrar} onDelete={onEliminarFoto} />

      <CamaraModal
        visible={camaraVisible}
        onCerrar={() => setCamaraVisible(false)}
        onConfirmar={onConfirmarFoto}
        guardando={saving}
      />
    </View>
  );
}
