import { SafeUrl } from '@angular/platform-browser';

export interface usuario {
    usuarioId?: number;
    Nombre?: string;
    Apellido?: string;
    instaladorId?: number;
    movilId?: number;
    descripcion?: string;
    avatar?: string;
    fecha?:string
  }
  
export interface tarea {
  tareaId?: number;
  descripcion?: string;
  Trabajo?: string;
  Rendicion?: string;
  tipoTrabajoId?: number;
  tareaRendicionId?: number;
  desccod?: string;
}


export interface trabajo {
  tipoTrabajoId?: number;
  descripcion?: string;
}

export interface material{

  materialId?:number;
  descripcion?:string;
  codigoSap?: number;
  cantidad?: number;
}

export interface ordenCabecera {
  'Nro Orden'?: number;
  Imp?: number;
  Estado?: string;
  Tipo?: string;
  Base?: string;
  Ubicacion?: any;
  Movil?: string;
  Instalador?: string;
  'Fec. Instalación'?: string;
  clienteID?: any;
  Cliente?: string;
  calle?: string;
  'Nro.'?: number;
  Domicilio?: string;
  comentarios?: string;
  Sector?: any;
  'Fec. Carga'?: string;
  Usuario?: string;
  Carga?: string;
  movilId?:number;
}


export interface ordenInstalador {
  ordenId?: number;
  importacionId?: number;
  calle?: string;
  numero?: number;
  cliente?: string;
  fechaInstalacion?: string;
  comentarios?: string;
  clienteID?: any;
  fechaCarga?: string;
  estadoId?: number;
  Estado?: string;
  movilId?: number;
  instaladorId?: number;
  usuarioId?: number;
  tipoTrabajoId?: number;
  sincronizado?:boolean;
  tareas?:ordenItem[];
  equipos?:equipo[];
  materiales?:ordenItemMaterial[];
  imagenes?:imagen[];
  recuperos?:equipo[];
}

export interface ordenItem {
  tareaId:string;
  Descripcion: string;
  cantidad:number;
}


export interface ordenItemMaterial{
  materialId?: number;
  medidaInicial?: number;
  medidaFinal?: number;
  nroSerie?: string;
  nroSerieR?:string;
  tipoConsumoId?: number;
  cantidad?:number;
  descripcion?:string;
  Cantidad?:number; // para compàtibilidad con pagina web que estan mal escrito
  Descripcion?:string; // para compàtibilidad con pagina web que estan mal escrito
}

export interface tareasInstalador {
  ordenId?: number;
  importacionId?: number;
  tareas?: tareaInstalador[];
  usuarioId?: number;
}
/**
 item: number;

 * 
 */

export interface imagen {
  ordenId?: number;
  imagenId?: number;
  imagen?:any;
  mimeType:any;
  id?:any;
  estadoId:number;
}


export interface tareaInstalador {
  tareaId?: number;
  cantidad?: number;
}

export interface equipo {
  equipoId?: number;
  nroSerie?: string;
  materialId?: number;
  descripcion?: string;
  abonado?:boolean;
  imagen?:string;
  mimeType?:string;
  imagenId?:string;
  src?:SafeUrl;
}

export enum ModoGrabadoOrden {
   TODO = "1",
   CABECERA = "2",
   ESTADO = "3",
   TAREAS = "4",
   MATERIALES = "5",
   EQUIPOS = "6",
   FOTOS = "7",
}
