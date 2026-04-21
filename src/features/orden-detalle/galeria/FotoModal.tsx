import { Image, Modal, Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';
import type { OrdenImagen } from '@/domain/orden';
import { imagenToUri } from '@/lib/imagen';

type Props = {
  foto: OrdenImagen | null;
  onClose: () => void;
};

export function FotoModal({ foto, onClose }: Props) {
  const uri = foto ? imagenToUri(foto) : null;

  return (
    <Modal
      visible={foto !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/95">
        <View className="absolute right-4 top-12 z-10">
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Cerrar foto"
            hitSlop={12}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
          >
            <X size={22} color="#FFFFFF" />
          </Pressable>
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
