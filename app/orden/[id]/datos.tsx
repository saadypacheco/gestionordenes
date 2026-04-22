import { Alert, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { CheckCircle, MapPin, MinusCircle } from 'lucide-react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { DatoRow } from '@/features/orden-detalle/datos/DatoRow';
import { DatosSeccion } from '@/features/orden-detalle/datos/DatosSeccion';
import { fechaDisplay, fechaHoraDisplay } from '@/lib/fecha';
import { formatoDireccion } from '@/lib/formato';
import { parsearUbicacion } from '@/lib/gps';

export default function DatosTab() {
  const { orden } = useOrdenContext();
  if (!orden) return null;

  const tieneExtensiones = Boolean(
    orden.iniciadaAt ?? orden.cerradaAt ?? orden.ubicacion,
  );

  const firmada = orden.imagenes.some((i) => i.tipo === 'firma');

  const coords = parsearUbicacion(orden.ubicacion ?? null);

  const abrirEnMapa = async () => {
    if (!coords) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    const ok = await Linking.canOpenURL(url);
    if (ok) {
      Linking.openURL(url);
    } else {
      Alert.alert('No disponible', 'No se pudo abrir Google Maps en este dispositivo.');
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-surface-bg"
      contentContainerStyle={{ padding: 12 }}
    >
      <DatosSeccion titulo="Identificación">
        <DatoRow label="Orden N°" valor={orden.ordenId} />
        <DatoRow label="Importación" valor={orden.importacionId} />
        <DatoRow label="Cliente ID" valor={orden.clienteId} />
      </DatosSeccion>

      <DatosSeccion titulo="Domicilio">
        <DatoRow label="Dirección" valor={formatoDireccion(orden)} />
        <DatoRow label="Domicilio" valor={orden.domicilio} />
        <DatoRow label="Sector" valor={orden.sector} />
      </DatosSeccion>

      <DatosSeccion titulo="Fechas">
        <DatoRow label="Instalación" valor={fechaDisplay(orden.fechaInstalacion)} />
        <DatoRow label="Carga" valor={fechaDisplay(orden.fechaCarga)} />
      </DatosSeccion>

      <DatosSeccion titulo="Responsables">
        <DatoRow label="Instalador" valor={orden.instaladorId} />
        <DatoRow label="Usuario" valor={orden.usuarioId} />
        <DatoRow label="Móvil" valor={orden.movilId} />
        <DatoRow label="Tipo trabajo" valor={orden.tipoTrabajoId} />
      </DatosSeccion>

      {(tieneExtensiones || firmada) && (
        <DatosSeccion titulo="Extensiones (M6)">
          <DatoRow label="Iniciada" valor={fechaHoraDisplay(orden.iniciadaAt)} />
          <DatoRow label="Cerrada" valor={fechaHoraDisplay(orden.cerradaAt)} />
          {coords ? (
            <View className="flex-row items-start border-b border-border/60 py-2">
              <Text className="w-[38%] text-xs font-medium uppercase tracking-wide text-text-secondary">
                Ubicación
              </Text>
              <Pressable
                onPress={abrirEnMapa}
                accessibilityRole="button"
                accessibilityLabel="Abrir ubicación en Google Maps"
                className="flex-1 flex-row items-center active:opacity-70"
              >
                <Text className="flex-1 text-sm text-brand-primary underline">
                  {orden.ubicacion}
                </Text>
                <MapPin size={14} color="#1E40AF" />
              </Pressable>
            </View>
          ) : (
            <DatoRow label="Ubicación" valor={orden.ubicacion} />
          )}
          <View className="flex-row items-center py-2">
            <Text className="w-[38%] text-xs font-medium uppercase tracking-wide text-text-secondary">
              Firma cliente
            </Text>
            <View className="flex-1 flex-row items-center">
              {firmada ? (
                <>
                  <CheckCircle size={14} color="#16A34A" />
                  <Text className="ml-1.5 text-sm font-medium text-state-success">Firmada</Text>
                </>
              ) : (
                <>
                  <MinusCircle size={14} color="#94A3B8" />
                  <Text className="ml-1.5 text-sm text-text-secondary">No firmada</Text>
                </>
              )}
            </View>
          </View>
        </DatosSeccion>
      )}
    </ScrollView>
  );
}
