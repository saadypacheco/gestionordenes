import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { CheckCircle, Lock, Play, Square } from 'lucide-react-native';

import { EstadoOrden } from '@/config/constants';
import { useOrdenContext } from '../OrdenContext';
import { FirmaModal } from '../firma/FirmaModal';
import { useOrdenAcciones } from './useOrdenAcciones';

/**
 * Barra de acciones al pie del header de la orden.
 *
 * Reglas de visibilidad según estado:
 *  - Anulada (90): no se muestra nada editable.
 *  - Cerrada (20): badge "Cerrada" informativo.
 *  - En curso (15) sin iniciadaAt: botón "Iniciar".
 *  - En curso (15) con iniciadaAt: botón "Cerrar orden" (abre FirmaModal).
 */
export function AccionesBar() {
  const { orden } = useOrdenContext();
  const [firmaVisible, setFirmaVisible] = useState(false);
  const { iniciar, cerrar, saving, accionActual, error, mensajeGps } =
    useOrdenAcciones();

  if (!orden) return null;

  const estadoCerrada = orden.estadoId === EstadoOrden.Cerrada;
  const estadoAnulada = orden.estadoId === EstadoOrden.Anulada;
  const yaIniciada = orden.iniciadaAt !== null && orden.iniciadaAt !== undefined;

  if (estadoAnulada) {
    return (
      <View className="flex-row items-center rounded-lg bg-border px-3 py-2">
        <Lock size={14} color="#475569" />
        <Text className="ml-2 text-xs text-text-secondary">Orden anulada (solo lectura)</Text>
      </View>
    );
  }

  if (estadoCerrada) {
    return (
      <View className="flex-row items-center rounded-lg bg-state-success/10 px-3 py-2">
        <CheckCircle size={14} color="#16A34A" />
        <Text className="ml-2 text-xs font-medium text-state-success">
          Orden cerrada · no se puede modificar
        </Text>
      </View>
    );
  }

  const handleIniciar = () => {
    iniciar().catch(() => {
      Alert.alert('Error', error ?? 'No pudimos iniciar la orden.');
    });
  };

  const handleCerrar = () => {
    if (!yaIniciada) {
      Alert.alert(
        'Iniciá la orden primero',
        'Antes de cerrar, marcá la orden como iniciada para dejar constancia del tiempo en sitio.',
      );
      return;
    }
    setFirmaVisible(true);
  };

  const onConfirmarFirma = async (dataUri: string) => {
    try {
      await cerrar({ firmaSourceUri: dataUri });
      setFirmaVisible(false);
      if (mensajeGps) {
        Alert.alert(
          'Orden cerrada',
          `Se cerró la orden pero no pudimos leer el GPS (${mensajeGps}). Podés reintentar desde el tab Datos cuando tengas señal.`,
        );
      }
    } catch {
      Alert.alert('Error', error ?? 'No pudimos cerrar la orden. Probá de nuevo.');
    }
  };

  return (
    <>
      <View className="flex-row gap-2">
        <Pressable
          onPress={handleIniciar}
          disabled={saving || yaIniciada}
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center rounded-lg bg-state-progress/10 py-2.5 active:opacity-70 disabled:opacity-50"
        >
          {saving && accionActual === 'iniciar' ? (
            <ActivityIndicator size="small" color="#0891B2" />
          ) : (
            <Play size={14} color="#0891B2" />
          )}
          <Text className="ml-1.5 text-xs font-semibold text-state-progress">
            {yaIniciada ? 'Iniciada' : 'Iniciar'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleCerrar}
          disabled={saving}
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center rounded-lg bg-brand-primary py-2.5 active:opacity-80 disabled:opacity-50"
        >
          {saving && accionActual === 'cerrar' ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Square size={14} color="#FFFFFF" />
          )}
          <Text className="ml-1.5 text-xs font-semibold text-white">
            {saving && accionActual === 'cerrar' ? 'Cerrando…' : 'Cerrar orden'}
          </Text>
        </Pressable>
      </View>

      <FirmaModal
        visible={firmaVisible}
        guardando={saving && accionActual === 'cerrar'}
        onCerrar={() => setFirmaVisible(false)}
        onConfirmar={onConfirmarFirma}
      />
    </>
  );
}
