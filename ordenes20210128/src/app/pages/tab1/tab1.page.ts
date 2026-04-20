import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AlertController, ModalController, Platform} from '@ionic/angular';
import { AgregarOrdenPage } from '../../pages/agregar-orden/agregar-orden.page';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ordenInstalador, ordenItem, trabajo } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import  {Network} from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { DataLocalService } from 'src/app/services/data-local.service';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { fechaHoyStr } from 'src/app/functions/funciones';
//import { AppVersion } from '@ionic-native/app-version/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public ordenes :any[]=[];
  public tiposTrabajo:trabajo[];
  constructor(public ordeneService: OrdenesService,
              private router: Router,
              private modalOrden: ModalController,
              private usuarioService: UsuarioService,  
              public network: Network,
              public dataService:TrabajosService,
              public platform: Platform,
              public localdata: DataLocalService,
              public uiService: UIserviceService,
              //private appVersion: AppVersion 
              ) {

  }
  
   ngOnInit() {  }
  ionViewWillEnter(){
  this.refresh()

}
  async refresh(){


//    alert (this.appVersion.getAppName())
    const fechStr = fechaHoyStr();

    if (!this.usuarioService.usuario.instaladorId || this.usuarioService.usuario.instaladorId == null || this.usuarioService.usuario.instaladorId == undefined ){
      this.uiService.alertInformacion("Por favor Ingrese Usuario y clave");
      this.router.navigate(['/login']);
      return;
    }
    this.dataService.getTareas();
    this.dataService.getTipoTrabajo();
    this.dataService.getEquipos();
    this.dataService.getMateriales();
     this.ordeneService.getOrdenes(fechStr,fechStr,this.usuarioService.usuario.instaladorId.toString())
  }
  async addOrden(){

    // validar que tenga movil asignado al login. tambien verificar en el login
    //console.log("movil: " + this.usuarioService.usuario.movilId);
    if (this.usuarioService.usuario.movilId === undefined || this.usuarioService.usuario.movilId === null){
      //console.log ('mensaje de que no tiene movil asignado:'+ this.usuarioService.usuario.movilId );
      let msg = "No hay movil asignado para el usuario";

      this.uiService.alertInformacion(msg);
    }
    else  
    {
      //buscar ordenes en curso
      //console.log('ordenes[0]:'+this.ordenes[0].estadoid);
      var ordenesOpen = this.ordeneService.ordenes.filter(function (od) {
        return od.estadoId ===15;
       });
       
      if (ordenesOpen.length>=1 ) {
        //console.log("cierre las ordenes activas: "+ ordenesOpen.length);
        let msg = 'cierre la orden en curso'; 

        this.uiService.alertInformacion(msg);
      }
      else{
            const modal= await this.modalOrden.create({
            component: AgregarOrdenPage,
            //para pasar datos al ,modal
            });
            await modal.present();
            const {data} = await modal.onDidDismiss();
            this.refresh();
          }
    }    
  }

  verOrden(orden: ordenInstalador){

    orden.usuarioId = this.usuarioService.usuario.usuarioId
    this.router.navigateByUrl(`/main/tabs/orden/orden-form/${ orden.ordenId }`);

  }
 
//  checkConnection() {
//     let networkState = this.network.type;

//     let states = {};
//     states[Connection.UNKNOWN]  = 'Unknown connection';
//     states[Connection.ETHERNET] = 'Ethernet connection';
//     states[Connection.WIFI]     = 'WiFi connection';
//     states[Connection.CELL_2G]  = 'Cell 2G connection';
//     states[Connection.CELL_3G]  = 'Cell 3G connection';
//     states[Connection.CELL_4G]  = 'Cell 4G connection';
//     states[Connection.CELL]     = 'Cell generic connection';
//     states[Connection.NONE]     = 'No network connection';

//     this.dialog.alert('Connection type: ' + states[networkState]);
//    }


}
