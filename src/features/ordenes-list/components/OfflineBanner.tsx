import { Text, View } from 'react-native';
import { CloudOff } from 'lucide-react-native';

export function OfflineBanner() {
  return (
    <View
      accessibilityRole="alert"
      className="flex-row items-center bg-state-warning/10 px-4 py-2"
    >
      <CloudOff size={14} color="#EA580C" />
      <Text className="ml-2 flex-1 text-xs text-state-warning">
        Sin conexión — mostrando órdenes guardadas.
      </Text>
    </View>
  );
}
