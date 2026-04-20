export class OrdenCabecera{
      ordenId= null ;
      importacionId: number;
      calle: string;
      numero: string;
      cliente: string;
      fechaInstalacion: string;
      comentarios: string;
      clienteID: number;
      fechaCarga: string;
      estadoId: number;
      Estado= "";
      movilId: number;
      instaladorId: number;
      usuarioId: number;
      tipoTrabajoId:number;

      constructor(){
        this.ordenId= null ;
        this.importacionId= null;
        this.calle= "";
        this.numero= "";
        this.cliente= "";
        this.fechaInstalacion= "";
        this.comentarios= "";
        this.clienteID= null;
        this.fechaCarga= "";
        this.estadoId= null;
        this.Estado= "";
        this.movilId= null;
        this.instaladorId= null;
        this.usuarioId= null;
        this.tipoTrabajoId = null;
      }
};