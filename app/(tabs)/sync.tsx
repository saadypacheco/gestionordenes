import { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {
  AlertTriangle,
  CheckCircle2,
  CloudOff,
  ListTodo,
  RefreshCw,
} from 'lucide-react-native';

import { useSyncWorker } from '@/features/sync/useSyncWorker';
import { SyncQueueRowItem } from '@/features/sync/components/SyncQueueRowItem';

export default function SyncScreen() {
  const {
    pending,
    pendingCount,
    running,
    online,
    ultimoResultado,
    sincronizar,
    refrescarCola,
  } = useSyncWorker();

  const resumen = useMemo(() => {
    if (running) return { tono: 'progress', texto: 'Sincronizando…' } as const;
    if (!online) return { tono: 'warning', texto: 'Sin conexión' } as const;
    if (pendingCount === 0) {
      return { tono: 'success', texto: 'Todo sincronizado' } as const;
    }
    return { tono: 'progress', texto: `${pendingCount} pendiente${pendingCount === 1 ? '' : 's'}` } as const;
  }, [running, online, pendingCount]);

  const botonDisabled = running || !online || pendingCount === 0;

  return (
    <View className="flex-1 bg-surface-bg">
      {/* Resumen */}
      <View className="bg-surface-card px-4 py-4">
        <View className="flex-row items-center">
          <View
            className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${
              resumen.tono === 'success'
                ? 'bg-state-success/10'
                : resumen.tono === 'warning'
                  ? 'bg-state-warning/10'
                  : 'bg-state-progress/10'
            }`}
          >
            {resumen.tono === 'success' ? (
              <CheckCircle2 size={20} color="#16A34A" />
            ) : resumen.tono === 'warning' ? (
              <CloudOff size={20} color="#EA580C" />
            ) : running ? (
              <ActivityIndicator size="small" color="#0891B2" />
            ) : (
              <ListTodo size={20} color="#0891B2" />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-text-primary">
              {resumen.texto}
            </Text>
            <Text className="text-xs text-text-secondary">
              {online ? 'Conectado al servidor' : 'Reintenta cuando vuelva la conexión'}
            </Text>
          </View>
        </View>

        {/* Último resultado */}
        {ultimoResultado && (
          <View className="mt-3 flex-row gap-2">
            <View className="flex-1 rounded-lg bg-state-success/10 px-3 py-2">
              <Text className="text-[10px] uppercase tracking-wide text-text-secondary">
                Procesadas
              </Text>
              <Text className="text-lg font-semibold text-state-success">
                {ultimoResultado.procesados}
              </Text>
            </View>
            <View className="flex-1 rounded-lg bg-state-danger/10 px-3 py-2">
              <Text className="text-[10px] uppercase tracking-wide text-text-secondary">
                Con error
              </Text>
              <Text className="text-lg font-semibold text-state-danger">
                {ultimoResultado.fallidos}
              </Text>
            </View>
            <View className="flex-1 rounded-lg bg-state-warning/10 px-3 py-2">
              <Text className="text-[10px] uppercase tracking-wide text-text-secondary">
                Postergadas
              </Text>
              <Text className="text-lg font-semibold text-state-warning">
                {ultimoResultado.skipped}
              </Text>
            </View>
          </View>
        )}

        {/* CTA */}
        <Pressable
          onPress={() => {
            void sincronizar();
          }}
          disabled={botonDisabled}
          accessibilityRole="button"
          className="mt-3 flex-row items-center justify-center rounded-lg bg-brand-primary py-3 active:opacity-80 disabled:opacity-40"
        >
          {running ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <RefreshCw size={16} color="#FFFFFF" />
          )}
          <Text className="ml-2 text-sm font-semibold text-white">
            {running ? 'Sincronizando…' : 'Sincronizar ahora'}
          </Text>
        </Pressable>
      </View>

      {/* Lista de pendientes */}
      {pending.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <CheckCircle2 size={36} color="#16A34A" />
          <Text className="mt-3 text-base font-semibold text-text-primary">
            Cola vacía
          </Text>
          <Text className="mt-1 text-center text-sm text-text-secondary">
            Cuando edites una orden sin conexión, vas a ver los cambios pendientes acá.
          </Text>
        </View>
      ) : (
        <FlatList
          data={pending}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ padding: 12, gap: 8, paddingBottom: 96 }}
          refreshControl={
            <RefreshControl refreshing={running} onRefresh={refrescarCola} />
          }
          renderItem={({ item }) => <SyncQueueRowItem item={item} />}
          ListHeaderComponent={
            ultimoResultado?.errores && ultimoResultado.errores.length > 0 ? (
              <View className="mb-2 flex-row items-start rounded-lg border border-state-danger/30 bg-state-danger/10 p-3">
                <AlertTriangle size={14} color="#DC2626" />
                <Text className="ml-2 flex-1 text-xs text-state-danger">
                  Última sincronización con {ultimoResultado.errores.length}{' '}
                  {ultimoResultado.errores.length === 1 ? 'error' : 'errores'}. Se
                  reintentará automáticamente.
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
