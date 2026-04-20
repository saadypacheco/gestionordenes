import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ActivatedRoute } from '@angular/router';
import { ordenInstalador, ModoGrabadoOrden } from 'src/app/interfaces/interfaces';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-orden-form',
  templateUrl: './orden-form.page.html',
  styleUrls: ['./orden-form.page.scss'],
})
export class OrdenFormPage implements OnInit {

  public orden: ordenInstalador;
  segmentValue:string;
  segmentColor:string;
  disabledOrden: boolean;

  
  constructor(public ordeneService: OrdenesService,
    private route: ActivatedRoute ,
    private navPage: NavController,
    private uiService: UIserviceService
     ) { 
      //const x = this.route.snapshot.paramMap.get('orden');
      this.orden = {};
      this.segmentValue= "Tareas";
      
    }

  async ngOnInit() {
    this.orden  =   this.ordeneService.getOrden(this.route.snapshot.paramMap.get('orden'))
   // console.log(this.orden)
    this.disabledOrden= this.orden.estadoId ===15? false:true;    
  }

   segmentChanged(ev: any) {
 //   console.log('Segment changed', ev);
    this.segmentValue = ev.detail.value;
  }

  saveCloseOrden(){

    if (this.orden.tareas && this.orden.tareas.length>=1) {
      this.disabledOrden = !this.disabledOrden;
      this.orden.estadoId =  20;
      this.ordeneService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then((res:any)=>{

            this.uiService.alertInformacion("La Orden Nro:" + this.orden.ordenId + " se cerro correctamente")
            this.navPage.navigateRoot('/main/tabs/tab1',{animated:true});        
        });
    }
    else
      {
        let msg = 'La orden no tiene tareas';
        this.uiService.alertInformacion(msg);
      }  
  }

  saveAnularOrden(){

    const self = this
    self.uiService.alertConfirm("Desea anular la orden?",(x)=>{this._anularOrden()} );
}

_anularOrden(){
  this.orden.estadoId =  90;
  this.ordeneService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then((res:any)=>{
      if (res){
        this.disabledOrden = !this.disabledOrden;
        this.uiService.alertInformacion("La Orden Nro:" + this.orden.ordenId + " se anulo correctamente")
        this.navPage.navigateRoot('/main/tabs/tab1',{animated:true});        
      }
      else {
        this.uiService.alertInformacion("error al sincronizar y anular orden")
      }
    });
}


}
