import { ScrollView } from 'react-native';

import { useOrdenContext } from '@/features/orden-detalle/OrdenContext';
import { DatoRow } from '@/features/orden-detalle/datos/DatoRow';
import { DatosSeccion } from '@/features/orden-detalle/datos/DatosSeccion';
import { fechaDisplay, fechaHoraDisplay } from '@/lib/fecha';
import { formatoDireccion } from '@/lib/formato';

export default function DatosTab() {
  const { orden } = useOrdenContext();
  if (!orden) return null;

  const tieneExtensiones = Boolean(
    orden.iniciadaAt ?? orden.cerradaAt ?? orden.ubicacion,
  );

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

      {tieneExtensiones && (
        <DatosSeccion titulo="Extensiones (M6)">
          <DatoRow label="Iniciada" valor={fechaHoraDisplay(orden.iniciadaAt)} />
          <DatoRow label="Cerrada" valor={fechaHoraDisplay(orden.cerradaAt)} />
          <DatoRow label="Ubicación" valor={orden.ubicacion} multiline />
        </DatosSeccion>
      )}
    </ScrollView>
  );
}
