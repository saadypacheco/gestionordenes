import { Image, Modal, Pressable, Text, View } from 'react-native';
import { CloudCheck, Trash2, X } from 'lucide-react-native';
import type { OrdenImagen } from '@/domain/orden';
import { imagenToUri } from '@/lib/imagen';

type Props = {
  foto: OrdenImagen | null;
  onClose: () => void;
  /** Si se provee, muestra botón de eliminar cuando la foto no está subida. */
  onDelete?: (foto: OrdenImagen) => void;
};

export function FotoModal({ foto, onClose, onDelete }: Props) {
  const uri = foto ? imagenToUri(foto) : null;
  // El backend ahora soporta borrado; el botón siempre está disponible cuando
  // se pasa el callback. El chip "Sincronizada" queda como info.
  const puedeEliminar = foto !== null && onDelete !== undefined;
  const yaSubida = foto?.subida === true;

  return (
    <Modal
      visible={foto !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/95">
        {/* Top bar */}
        <View className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between px-4 pt-12">
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Cerrar foto"
            hitSlop={12}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
          >
            <X size={22} color="#FFFFFF" />
          </Pressable>
          {yaSubida && (
            <View className="flex-row items-center rounded-full bg-state-success/20 px-3 py-1.5">
              <CloudCheck size={14} color="#86EFAC" />
              <Text className="ml-1.5 text-xs font-medium text-white">Sincronizada</Text>
            </View>
          )}
          {puedeEliminar && (
            <Pressable
              onPress={() => foto && onDelete?.(foto)}
              accessibilityRole="button"
              accessibilityLabel="Eliminar foto"
              hitSlop={12}
              className="h-10 w-10 items-center justify-center rounded-full bg-state-danger/30 active:bg-state-danger/50"
            >
              <Trash2 size={20} color="#FCA5A5" />
            </Pressable>
          )}
          {!puedeEliminar && !yaSubida && <View className="w-10" />}
        </View>

        {uri && (
          <Image
            source={{ uri }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        )}
      </View>
    </Modal>
  );
}
