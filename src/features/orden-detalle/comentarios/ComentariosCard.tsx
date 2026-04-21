import { Text, View } from 'react-native';
import { MessageSquare } from 'lucide-react-native';

type Props = {
  texto: string;
};

export function ComentariosCard({ texto }: Props) {
  return (
    <View className="rounded-xl border border-border bg-surface-card p-4">
      <View className="mb-2 flex-row items-center">
        <MessageSquare size={14} color="#475569" />
        <Text className="ml-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Nota del despachador
        </Text>
      </View>
      <Text className="text-sm leading-5 text-text-primary">{texto}</Text>
    </View>
  );
}
