
import { Injectable, ResolvedReflectiveFactory, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ordenInstalador, ordenItem, ModoGrabadoOrden} from './../interfaces/interfaces'
import { Platform } from '@ionic/angular';
import { DataLocalService } from './data-local.service';
import { UIserviceService } from './uiservice.service';
import { Observable, forkJoin, of } from 'rxjs';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  public hayConexion: boolean = false;
  public ordenes: ordenInstalador[]=[];
  constructor(private http: HttpClient,
    private platform: Platform,
    private localdata: DataLocalService,
    private uiService: UIserviceService,
    private fileTransfer: FileTransfer) { }

  getOrden(ordenId): ordenInstalador{
    const x =  this.localdata.ordenes;
    return x.filter(o=>{return o.ordenId == ordenId})[0]
    
  }

    getOrdenes(fechaDesde:string, fechaHasta:string, instaladorId:string){
      let self = this;
      //this.uiService.alertInformacion(`${ URL }/ordenes/listarInst/"${ fechaDesde }"/"${ fechaHasta }"/${ instaladorId }`);

      const path = `${ URL }/ordenes/listarInst/"${ fechaDesde }"/"${ fechaHasta }"/${ instaladorId }`
      self.sincronizar().subscribe( x=> {
        self.http.get(path).subscribe((resp:any[]) => {
          self.localdata.clearOrdenes();
          resp.forEach(ord => {
            ord.sincronizado = true;
            ord.fechaInstalacion = ord.fechaInstalacion.substring(0,10);
            ord.cliente =  ord.cliente == 'undefined'?'': ord.cliente ;
            ord.materiales.forEach(mat=>{
              mat.cantidad = mat.Cantidad;
              mat.materialId = mat.materialid})
              ord.recuperos.forEach(mat=>{
                mat.nroSerie = mat.MAC
                mat.materialId = mat.materialid;})
              self.localdata.saveOrdenes(ord);
          });
          document.body.setAttribute('color-theme','dark')
          this.ordenes = resp;

      },(err) => {
         console.log(err)
         self.localdata.loadOrdenes().then( x=>{
          this.ordenes = self.localdata.ordenes;
          document.body.setAttribute('color-theme','light')
   //     this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'No se pudo cargar ordenes del instalador');
        });
        
        })
    },(err) => { 
      this.hayConexion = false;
      self.localdata.loadOrdenes().then( x=>{
        this.ordenes = self.localdata.ordenes;
        document.body.setAttribute('color-theme','light')
  //    this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'No se pudo cargar ordenes del instalador');
      });
    }
      )
  }

  hayQueSincronizar():boolean{
    return this.localdata.ordenes.filter(x=>{return x.sincronizado == false}).length > 0
  }
  setConexion(valor:boolean){
    let self = this
    self.hayConexion = valor;
  }

  sincronizar():Observable<any>{
    //console.log('voy a sincronizar')
    let ordenes = this.localdata.ordenes.filter(x=>{return x.sincronizado == false})
    ordenes = ordenes.map(x=> {x.imagenes = []; return x})
     return this.http.post(`${ URL }/ordenes/sincronizar`,{"ordenes":ordenes});

  }

  grabarSincronizar(ordenActual:ordenInstalador, modo: ModoGrabadoOrden):Promise<any>{
    //console.log('voy a sincronizar')
    // filtra las ordenes de la local sotrage y se queda con las que estan
    // sin sincronizar
    let ordenes = this.localdata.ordenes.filter(x=>{return x.sincronizado == false && x.ordenId != ordenActual.ordenId})
    ordenes = ordenes.map(x=> {
      x.imagenes = []; 
      x.equipos = x.equipos.map( e => {e.imagen = ""; return e;});
      return x})

      //hago una copia de la orden actual sin las imagenes para mandar a grabar
      var _ordenAct = ordenActual;
      if (_ordenAct.equipos)
          _ordenAct.equipos = _ordenAct.equipos.map( e => {e.imagen = ""; return e;});
    // console.log('voy a sincronizar',ordenes)
    
    // llama al WS para guardar ordenes sin sincroinizar
    // envia las ordenes sin sincronizar y la orden actual por separado
    // si no hay error al grabar :
    //    graba orden actual en LS
    //    pone todas las ordenes como sincronizado
    //si hay error solo agrega orden actual a LS

    return new Promise(resolve => {
      this.http.post(`${ URL }/ordenes/grabarSincronizar`,{"ordenes":ordenes,"ordenActual":_ordenAct,"modo":modo})
      .subscribe(x=> {
        ordenActual.sincronizado = true
        this.localdata.saveOrdenes(ordenActual);    
        this.localdata.ordenes.forEach(ord => {
          ord.sincronizado = true;
          ord.fechaInstalacion = ord.fechaInstalacion.substring(0,10);
          this.localdata.saveOrdenes(ord);
        });
        document.body.setAttribute('color-theme','dark')

        resolve({"resultado":true})},
      err => { 
        ordenActual.sincronizado = false;
        if (err.error.status  ){
          resolve({"resultado":true,"error":err.error.error})  
        }
        else{
          this.localdata.saveOrdenes(ordenActual);
          document.body.setAttribute('color-theme','light')
          resolve({"resultado":true})
        }
      })
    }); 

  }

mostrarError(error, entidad){
  console.log(error);
  let msg = "<b>Error de Conexion: </b></br>"+"No se pudo grabar" + entidad;
  this.uiService.alertInformacion(msg)

}

subirImagen( img: string ,ordenId:string, imagenId:string) {

  const options: FileUploadOptions = {
    fileKey: 'image',
    params:{ordenId:ordenId, imagenId: imagenId}
  };

  const fileTransfer: FileTransferObject = this.fileTransfer.create();

  fileTransfer.upload( img, `${ URL }/ordenes/guardarImagen`, options )
    .then( data => {
      console.log(data);
    }).catch( err => {
      console.log('error en carga', err);
    });

}

 getImagenes(ordenId:string):Observable<any>{
console.log("voy a buscar la orden");
  const path = `${URL}/ordenes/imagenesListar/${ordenId}`;

    
      return this.http.get(path )
      
    
 }


}
