import { Text, View } from 'react-native';

type Props = {
  label: string;
  valor: string | number | null | undefined;
  /** Texto multiline (ej: comentarios). Por default una sola línea con ellipsis. */
  multiline?: boolean;
};

export function DatoRow({ label, valor, multiline }: Props) {
  const texto =
    valor === null || valor === undefined || valor === '' ? '—' : String(valor);

  return (
    <View className="flex-row items-start border-b border-border/60 py-2 last:border-b-0">
      <Text className="w-[38%] text-xs font-medium uppercase tracking-wide text-text-secondary">
        {label}
      </Text>
      <Text
        className="flex-1 text-sm text-text-primary"
        numberOfLines={multiline ? undefined : 1}
      >
        {texto}
      </Text>
    </View>
  );
}
