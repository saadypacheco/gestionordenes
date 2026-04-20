import { Redirect, useLocalSearchParams } from 'expo-router';

export default function OrdenIndex() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/orden/${id}/tareas`} />;
}
