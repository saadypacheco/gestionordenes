import { useRef, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera as CameraIcon, Check, RefreshCw, X } from 'lucide-react-native';

type Props = {
  visible: boolean;
  onCerrar: () => void;
  /** Callback con el URI temporal de la foto tomada. La persistencia es responsabilidad del llamador. */
  onConfirmar: (sourceUri: string) => Promise<void> | void;
  guardando?: boolean;
};

/**
 * Cámara para tomar una foto de la instalación. Flujo:
 *  1. Preview de cámara + shutter (si tenemos permiso).
 *  2. Preview de la foto tomada con botones "Repetir" / "Usar foto".
 *  3. Al confirmar, invocamos `onConfirmar(sourceUri)` y el caller decide
 *     procesar + guardar + cerrar.
 */
export function CamaraModal({ visible, onCerrar, onConfirmar, guardando }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [shooting, setShooting] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  const reset = () => {
    setCapturedUri(null);
    setShooting(false);
  };

  const disparar = async () => {
    if (!cameraRef.current || shooting) return;
    setShooting(true);
    try {
      const pic = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (pic?.uri) setCapturedUri(pic.uri);
    } finally {
      setShooting(false);
    }
  };

  const handleConfirmar = async () => {
    if (!capturedUri) return;
    await onConfirmar(capturedUri);
    reset();
  };

  const handleCerrar = () => {
    reset();
    onCerrar();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleCerrar}
    >
      <View className="flex-1 bg-black">
        {/* Top bar */}
        <View className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-black/70 px-4 pb-3 pt-12">
          <Pressable
            onPress={handleCerrar}
            accessibilityRole="button"
            accessibilityLabel="Cerrar cámara"
            hitSlop={12}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
          >
            <X size={22} color="#FFFFFF" />
          </Pressable>
          <Text className="text-sm font-semibold text-white">
            {capturedUri ? 'Revisá la foto' : 'Tomar foto'}
          </Text>
          <View className="w-10" />
        </View>

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
              Para registrar evidencia fotográfica de la instalación.
            </Text>
            <Pressable
              onPress={requestPermission}
              accessibilityRole="button"
              className="mt-5 rounded-lg bg-brand-primary px-4 py-2 active:opacity-80"
            >
              <Text className="text-sm font-medium text-white">Conceder permiso</Text>
            </Pressable>
          </View>
        ) : capturedUri ? (
          // Preview post-shot
          <>
            <Image
              source={{ uri: capturedUri }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
            <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-black/70 px-6 pb-10 pt-5">
              <Pressable
                onPress={reset}
                disabled={guardando}
                accessibilityRole="button"
                className="flex-row items-center rounded-lg bg-white/20 px-4 py-3 active:bg-white/30 disabled:opacity-50"
              >
                <RefreshCw size={18} color="#FFFFFF" />
                <Text className="ml-2 text-sm font-medium text-white">Repetir</Text>
              </Pressable>
              <Pressable
                onPress={handleConfirmar}
                disabled={guardando}
                accessibilityRole="button"
                className="flex-row items-center rounded-lg bg-brand-primary px-4 py-3 active:opacity-80 disabled:opacity-50"
              >
                {guardando ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Check size={18} color="#FFFFFF" />
                )}
                <Text className="ml-2 text-sm font-semibold text-white">
                  {guardando ? 'Guardando…' : 'Usar foto'}
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          // Camera preview
          <>
            <CameraView ref={cameraRef} facing="back" style={{ flex: 1 }} />
            {/* Shutter */}
            <View className="absolute bottom-0 left-0 right-0 items-center bg-black/70 pb-10 pt-5">
              <Pressable
                onPress={disparar}
                disabled={shooting}
                accessibilityRole="button"
                accessibilityLabel="Disparar"
                className="h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/20 active:bg-white/40 disabled:opacity-60"
              >
                {shooting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <View className="h-14 w-14 rounded-full bg-white" />
                )}
              </Pressable>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}
