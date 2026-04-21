import { Pressable, Text, View } from 'react-native';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';

type Props = {
  mensaje: string;
  onRetry?: () => void;
};

export function ErrorBanner({ mensaje, onRetry }: Props) {
  return (
    <View
      accessibilityRole="alert"
      className="mx-4 mt-3 flex-row items-center rounded-lg border border-state-danger/30 bg-state-danger/10 p-3"
    >
      <AlertTriangle size={16} color="#DC2626" />
      <Text className="ml-2 flex-1 text-xs text-state-danger">{mensaje}</Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          accessibilityRole="button"
          hitSlop={8}
          className="ml-2 flex-row items-center"
        >
          <RefreshCw size={14} color="#DC2626" />
          <Text className="ml-1 text-xs font-medium text-state-danger">Reintentar</Text>
        </Pressable>
      )}
    </View>
  );
}
