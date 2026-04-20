import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AgregarOrdenPageRoutingModule } from './agregar-orden-routing.module';
import {TrabajosService} from '../../services/trabajos.service';
import { trabajo,ordenInstalador, ModoGrabadoOrden } from '../../interfaces/interfaces';
import { OrdenCabecera } from 'src/app/models/ordenCabecera';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { DataLocalService } from '../../services/data-local.service';
import { isNumber } from 'util';
import { map } from 'rxjs/operators';
import { fechaHoyStr } from 'src/app/functions/funciones';


@Component({
  selector: 'app-agregar-orden',
  templateUrl: './agregar-orden.page.html',
  styleUrls: ['./agregar-orden.page.scss'],
})
export class AgregarOrdenPage implements OnInit {

   
  // cambiar :recibo datos de la pagina llama al modal.
  // podemos recibir los datos del usuario o calcularlos aca.

  orden: ordenInstalador={};

  tipoTrabajos: trabajo[] = [];

  grabando:boolean = false;

  constructor( public dataService: TrabajosService, private modalOrden: ModalController, 
    private usuService: UsuarioService,
    private ordenService: OrdenesService,
    private uiService: UIserviceService,
    private dataLocal: DataLocalService  ){

    this.orden.movilId = this.usuService.usuario.movilId;
    this.orden.instaladorId = this.usuService.usuario.instaladorId;
    this.orden.estadoId= 15;
    this.orden.usuarioId = this.usuService.usuario.usuarioId;
    this.orden.comentarios = "";
    this.orden.fechaInstalacion = fechaHoyStr();
    // console.log(this.orden.fechaInstalacion);
     const fecha = new Date();

   }

  ngOnInit() {
      
  }

  cancelAddOrden(){
    this.modalOrden.dismiss();
  }

  async saveNewOrden(){
  //  console.log(this.orden.calle);
    this.orden.usuarioId = this.usuService.usuario.usuarioId
    if (!this.orden.ordenId || !isNumber(this.orden.ordenId)){
      this.uiService.alertInformacion("Numero de Orden incorrecto ")
      return;
    }

    if (!this.orden.tipoTrabajoId ){
      this.uiService.alertInformacion("Seleccione tipo de Trabajo")
      return;
    }

    if (!this.orden.calle ){
      this.uiService.alertInformacion("Ingrese Dirección ")
      return;
    }

    if (isNaN(Number(this.orden.numero))){
      this.uiService.alertInformacion("Numero de Domicilio incorrecto ");
      return;
    }

    this.grabando = true;
    if (!isNumber(this.orden.tipoTrabajoId)){ this.orden.tipoTrabajoId =  this.orden.tipoTrabajoId*1}
    this.ordenService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then( (res:any) =>{

        if ( res){
          //this.dataLocal.saveOrdenes(this.orden);
          this.grabando = false;
          this.modalOrden.dismiss(this.orden);
        }
        else {
          this.uiService.alertInformacion(res.error.error)
          document.body.setAttribute('color-theme','light')

        }

    },err=>{
      this.uiService.alertInformacion("No se pudo grabar");
      document.body.setAttribute('color-theme','light')

      console.log(err)
    });

  }
}
