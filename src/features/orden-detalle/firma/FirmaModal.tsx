import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import Signature, {
  type SignatureViewRef,
} from 'react-native-signature-canvas';
import { Check, Eraser, X } from 'lucide-react-native';

type Props = {
  visible: boolean;
  guardando?: boolean;
  onCerrar: () => void;
  /** Callback con el data URI (`data:image/png;base64,...`) de la firma. */
  onConfirmar: (dataUri: string) => Promise<void> | void;
};

/**
 * Modal con `react-native-signature-canvas` para capturar la firma del cliente.
 * El canvas expone `readSignature()` que dispara `onOK` con el base64 data URI.
 *
 * Flujo:
 *  1. El cliente firma.
 *  2. Tap "Confirmar" → `readSignature()` → `onOK(dataUri)` → `onConfirmar`.
 *  3. Tap "Borrar" → limpia el canvas.
 */

const WEB_STYLE = `
  .m-signature-pad { box-shadow: none; border: none; margin: 0; }
  .m-signature-pad--body { border: 2px dashed #CBD5E1; border-radius: 12px; }
  .m-signature-pad--footer { display: none; }
  body, html { background-color: #F8FAFC; }
`;

export function FirmaModal({ visible, guardando, onCerrar, onConfirmar }: Props) {
  const ref = useRef<SignatureViewRef>(null);
  const [cargando, setCargando] = useState(false);

  const handleOK = async (signature: string) => {
    setCargando(true);
    try {
      await onConfirmar(signature);
    } finally {
      setCargando(false);
    }
  };

  const confirmar = () => {
    ref.current?.readSignature();
  };

  const borrar = () => {
    ref.current?.clearSignature();
  };

  const handleEmpty = () => {
    // noop — el botón no debería permitir llegar acá si no hay firma,
    // pero dejamos la callback para que la lib no rompa.
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onCerrar}
    >
      <View className="flex-1 bg-surface-bg">
        {/* Top bar */}
        <View className="flex-row items-center justify-between border-b border-border bg-surface-card px-4 pb-3 pt-12">
          <Pressable
            onPress={onCerrar}
            accessibilityRole="button"
            accessibilityLabel="Cerrar"
            hitSlop={12}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-border"
          >
            <X size={22} color="#0F172A" />
          </Pressable>
          <Text className="text-base font-semibold text-text-primary">
            Firma del cliente
          </Text>
          <View className="w-10" />
        </View>

        {/* Canvas */}
        <View className="flex-1 p-4">
          <Text className="mb-2 text-xs text-text-secondary">
            Pedile al cliente que firme dentro del recuadro.
          </Text>
          <View className="flex-1 overflow-hidden rounded-xl bg-surface-card">
            <Signature
              ref={ref}
              onOK={handleOK}
              onEmpty={handleEmpty}
              webStyle={WEB_STYLE}
              descriptionText=""
              imageType="image/png"
              backgroundColor="#F8FAFC"
              penColor="#0F172A"
              dotSize={1}
              minWidth={1.2}
              maxWidth={2.4}
              trimWhitespace
            />
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row gap-2 border-t border-border bg-surface-card px-4 pb-8 pt-3">
          <Pressable
            onPress={borrar}
            disabled={cargando || guardando}
            accessibilityRole="button"
            className="flex-1 flex-row items-center justify-center rounded-lg border border-border bg-surface-bg py-3 active:opacity-70 disabled:opacity-50"
          >
            <Eraser size={16} color="#475569" />
            <Text className="ml-1.5 text-sm font-medium text-text-secondary">Borrar</Text>
          </Pressable>
          <Pressable
            onPress={confirmar}
            disabled={cargando || guardando}
            accessibilityRole="button"
            className="flex-1 flex-row items-center justify-center rounded-lg bg-brand-primary py-3 active:opacity-80 disabled:opacity-50"
          >
            {cargando || guardando ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Check size={16} color="#FFFFFF" />
            )}
            <Text className="ml-1.5 text-sm font-semibold text-white">
              {cargando || guardando ? 'Guardando…' : 'Confirmar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
