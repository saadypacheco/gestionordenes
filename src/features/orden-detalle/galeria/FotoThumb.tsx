import { memo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { ImageOff } from 'lucide-react-native';
import type { OrdenImagen } from '@/domain/orden';
import { imagenToUri } from '@/lib/imagen';

type Props = {
  foto: OrdenImagen;
  sizePx: number;
  onPress: (foto: OrdenImagen) => void;
};

function FotoThumbImpl({ foto, sizePx, onPress }: Props) {
  const uri = imagenToUri(foto);

  return (
    <Pressable
      onPress={() => onPress(foto)}
      accessibilityRole="imagebutton"
      accessibilityLabel="Ver foto en grande"
      style={{ width: sizePx, height: sizePx }}
      className="overflow-hidden rounded-lg bg-border active:opacity-70"
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <View className="h-full w-full items-center justify-center">
          <ImageOff size={20} color="#94A3B8" />
        </View>
      )}
    </Pressable>
  );
}

export const FotoThumb = memo(FotoThumbImpl);
