import { useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useOrdenesDelDia } from '@/features/ordenes-list/useOrdenesDelDia';
import { OrdenCard } from '@/features/ordenes-list/components/OrdenCard';
import { OfflineBanner } from '@/features/ordenes-list/components/OfflineBanner';
import { EmptyState } from '@/features/ordenes-list/components/EmptyState';
import { ErrorBanner } from '@/features/ordenes-list/components/ErrorBanner';

export default function OrdenesList() {
  const router = useRouter();
  const { ordenes, loading, refreshing, online, lastError, refresh } = useOrdenesDelDia();

  const verOrden = useCallback(
    (ordenId: number) => {
      router.push(`/orden/${ordenId}`);
    },
    [router],
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-bg">
        <ActivityIndicator color="#1E40AF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-bg">
      {!online && <OfflineBanner />}
      {lastError && <ErrorBanner mensaje={lastError} onRetry={refresh} />}

      <FlatList
        data={ordenes}
        keyExtractor={(o) => String(o.ordenId)}
        contentContainerStyle={ordenes.length === 0 ? { flex: 1 } : { padding: 12, gap: 8 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="#1E40AF" />
        }
        ListEmptyComponent={<EmptyState online={online} />}
        renderItem={({ item }) => <OrdenCard orden={item} onPress={verOrden} />}
      />
    </View>
  );
}
