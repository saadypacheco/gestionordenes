import { useEffect, useState } from 'react';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';

/**
 * Hook reactivo sobre NetInfo. Expone si hay conexión utilizable.
 *
 * `NetInfo.isConnected` puede ser null en el primer tick — lo tratamos como
 * "asumir online" para no bloquear la UI al arrancar.
 */
export function useNetwork() {
  const [state, setState] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(setState);
    // Fetch inicial sincrónico
    NetInfo.fetch().then(setState);
    return unsubscribe;
  }, []);

  const online = state?.isConnected !== false; // null o true → online; solo false → offline
  return { online, state };
}
