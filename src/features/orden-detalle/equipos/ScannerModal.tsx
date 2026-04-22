import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
  type BarcodeType,
} from 'expo-camera';
import { Camera as CameraIcon, RefreshCw, X } from 'lucide-react-native';

import { normalizarNroSerie } from './validators';

type Props = {
  visible: boolean;
  onCerrar: () => void;
  onDetectado: (nroSerie: string) => void;
};

const BARCODE_TYPES: BarcodeType[] = [
  'qr',
  'code128',
  'code39',
  'code93',
  'ean13',
  'ean8',
  'upc_a',
  'upc_e',
  'datamatrix',
];

/**
 * Fullscreen modal que abre la cámara y devuelve el primer código escaneado.
 * - Pide permiso solo al abrir.
 * - Debounce: una vez detectado un código deja de escuchar nuevos hasta que
 *   el modal se cierre y reabra (evita disparos múltiples).
 */
export function ScannerModal({ visible, onCerrar, onDetectado }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const lockRef = useRef(false);

  // Reset al abrir
  useEffect(() => {
    if (visible) {
      setScanned(false);
      lockRef.current = false;
    }
  }, [visible]);

  const handleScan = useCallback(
    (result: BarcodeScanningResult) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setScanned(true);
      const valor = normalizarNroSerie(result.data ?? '');
      if (valor.length >= 3) {
        onDetectado(valor);
      } else {
        // código demasiado corto — permitir reintentar
        lockRef.current = false;
        setScanned(false);
      }
    },
    [onDetectado],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onCerrar}
    >
      <View className="flex-1 bg-black">
        {/* Top bar */}
        <View className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-black/70 px-4 pb-3 pt-12">
          <Pressable
            onPress={onCerrar}
            accessibilityRole="button"
            accessibilityLabel="Cerrar scanner"
            hitSlop={12}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
          >
            <X size={22} color="#FFFFFF" />
          </Pressable>
          <Text className="text-sm font-semibold text-white">Escanear equipo</Text>
          <View className="w-10" />
        </View>

        {/* Camera o estado de permiso */}
        {!permission ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#FFFFFF" />
          </View>
        ) : !permission.granted ? (
          <View className="flex-1 items-center justify-center px-6">
            <CameraIcon size={36} color="#FFFFFF" />
            <Text className="mt-3 text-center text-base font-semibold text-white">
              Necesitamos acceso a la cámara
            </Text>
            <Text className="mt-1 text-center text-sm text-white/70">
              Sin permiso no podemos escanear los códigos de los equipos.
            </Text>
            <Pressable
              onPress={requestPermission}
              accessibilityRole="button"
              className="mt-5 rounded-lg bg-brand-primary px-4 py-2 active:opacity-80"
            >
              <Text className="text-sm font-medium text-white">Conceder permiso</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <CameraView
              facing="back"
              style={{ flex: 1 }}
              onBarcodeScanned={scanned ? undefined : handleScan}
              barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES }}
            />
            {/* Marco visual */}
            <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
              <View
                style={{ width: 260, height: 260 }}
                className="rounded-2xl border-2 border-white/80"
              />
            </View>
            {/* Bottom hint */}
            <View className="absolute bottom-0 left-0 right-0 items-center bg-black/70 px-6 pb-10 pt-5">
              <Text className="text-center text-sm text-white/90">
                Apuntá la cámara al código del equipo.
              </Text>
              {scanned && (
                <Pressable
                  onPress={() => {
                    lockRef.current = false;
                    setScanned(false);
                  }}
                  accessibilityRole="button"
                  className="mt-3 flex-row items-center rounded-lg bg-white/20 px-3 py-2 active:bg-white/30"
                >
                  <RefreshCw size={14} color="#FFFFFF" />
                  <Text className="ml-1.5 text-xs font-medium text-white">Escanear de nuevo</Text>
                </Pressable>
              )}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}
