import { ScrollView } from 'react-native';
import { MessageSquare } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { ComentariosCard } from '@/features/orden-detalle/comentarios/ComentariosCard';
import { TabEmptyState } from '@/features/orden-detalle/components/TabEmptyState';

export default function ComentariosTab() {
  const { orden } = useOrdenContext();
  const texto = orden?.comentarios?.trim() ?? '';

  if (texto.length === 0) {
    return (
      <TabEmptyState
        icono={MessageSquare}
        titulo="Sin comentarios"
        descripcion="El despachador no dejó notas en esta orden."
      />
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-surface-bg"
      contentContainerStyle={{ padding: 12 }}
    >
      <ComentariosCard texto={texto} />
    </ScrollView>
  );
}
