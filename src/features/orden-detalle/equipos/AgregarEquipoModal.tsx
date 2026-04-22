import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Keyboard as KeyboardIcon, ScanBarcode, X } from 'lucide-react-native';

import { EquipoForm } from './EquipoForm';
import { ScannerModal } from './ScannerModal';
import { useEquiposMutations, type AgregarEquipoInput } from './useEquiposMutations';

type Props = {
  visible: boolean;
  onCerrar: () => void;
};

type Paso = 'elegir' | 'scanner' | 'form';

/**
 * Flujo de alta de equipo:
 *  1. Elegir → Escanear (ScannerModal) o Manual (EquipoForm)
 *  2. Scanner detecta nroSerie → abre EquipoForm precargado
 *  3. EquipoForm submit → agregar() → cerrar
 */
export function AgregarEquipoModal({ visible, onCerrar }: Props) {
  const [paso, setPaso] = useState<Paso>('elegir');
  const [nroSerieScaneado, setNroSerieScaneado] = useState('');
  const { agregar, saving, error } = useEquiposMutations();

  useEffect(() => {
    if (visible) {
      setPaso('elegir');
      setNroSerieScaneado('');
    }
  }, [visible]);

  const onSubmit = async (data: AgregarEquipoInput) => {
    try {
      const { duplicado } = await agregar(data);
      if (duplicado) {
        Alert.alert('Duplicado', 'Ya hay un equipo con ese número de serie en esta orden.');
        return;
      }
      onCerrar();
    } catch {
      // el error ya queda reflejado vía hook
    }
  };

  return (
    <>
      <Modal
        visible={visible && paso !== 'scanner'}
        transparent
        animationType="slide"
        onRequestClose={onCerrar}
        statusBarTranslucent
      >
        <View className="flex-1 bg-black/40 justify-end">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="rounded-t-2xl bg-surface-bg"
          >
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-border bg-surface-card px-4 py-3">
              <Text className="text-base font-semibold text-text-primary">
                {paso === 'elegir' ? 'Agregar equipo' : 'Datos del equipo'}
              </Text>
              <Pressable
                onPress={onCerrar}
                accessibilityRole="button"
                accessibilityLabel="Cerrar"
                hitSlop={12}
                className="p-1"
              >
                <X size={20} color="#0F172A" />
              </Pressable>
            </View>

            {paso === 'elegir' && (
              <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Pressable
                  onPress={() => setPaso('scanner')}
                  accessibilityRole="button"
                  className="mb-3 flex-row items-center rounded-xl border border-border bg-surface-card p-4 active:opacity-70"
                >
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                    <ScanBarcode size={24} color="#1E40AF" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-text-primary">Escanear código</Text>
                    <Text className="mt-0.5 text-xs text-text-secondary">
                      Apuntá la cámara al código del equipo.
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setPaso('form')}
                  accessibilityRole="button"
                  className="flex-row items-center rounded-xl border border-border bg-surface-card p-4 active:opacity-70"
                >
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-border">
                    <KeyboardIcon size={22} color="#475569" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-text-primary">
                      Ingreso manual
                    </Text>
                    <Text className="mt-0.5 text-xs text-text-secondary">
                      Cargá el número de serie a mano.
                    </Text>
                  </View>
                </Pressable>
              </ScrollView>
            )}

            {paso === 'form' && (
              <EquipoForm
                nroSerieInicial={nroSerieScaneado}
                saving={saving}
                errorGeneral={error}
                onSubmit={onSubmit}
                onCancelar={onCerrar}
              />
            )}
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <ScannerModal
        visible={visible && paso === 'scanner'}
        onCerrar={() => setPaso('elegir')}
        onDetectado={(serie) => {
          setNroSerieScaneado(serie);
          setPaso('form');
        }}
      />
    </>
  );
}
