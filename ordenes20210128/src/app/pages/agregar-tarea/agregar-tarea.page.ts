import { Component, OnInit, Input } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ordenItem, ordenInstalador, ModoGrabadoOrden } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
//import { AgregarTareaFormPage } from '../agregar-tarea-form/agregar-tarea-form.page';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { AgregarTareaFormPage } from '../agregar-tarea-form/agregar-tarea-form.page';



@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {
  @Input("orden") orden: ordenInstalador;
  @Input("color") parentColor: string;
  
  listaTarea: any[]=[];
  nombreItemTarea='';

  tarea: ordenItem ;

  public strOrden;

  constructor(private ordenesService:OrdenesService,
              private route: ActivatedRoute ,
              private modalTarea: ModalController,
              private uiService:UIserviceService) { 

  }

  ngOnInit() {

  }


  async addTarea(){
    const modal= await this.modalTarea.create({
      component: AgregarTareaFormPage,
      componentProps: {
        'orden': this.orden      }

    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
   // console.log('Datos para grabar la tarea',data );
    if (data === undefined) {return};
    this.tarea=  {
      tareaId: data.tareaId,
      Descripcion: data.descripcion,
      cantidad: data.cantidad
    }
    if (this.orden.tareas === undefined){
      this.orden.tareas = [];
    }

    if (this.orden.tareas.filter(x=> {return x.tareaId == data.tareaId}).length === 0){
      this.orden.tareas.push(this.tarea);
      this.ordenesService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then(x=> {
      
     //     this.uiService.alertInformacion("tarea agregada")  
            
      }).catch( x=>{
        this.uiService.alertInformacion("NO SE PUDO AGREGAR TAREA") 
      })
    }
 
  }

  deleteTarea(i:number){
    if (this.orden.estadoId == 15){
      this.orden.tareas.splice(i,1);
      this.ordenesService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then(x=> {
      this.uiService.alertInformacion("tarea eliminada")         
    })
    }
    else {
      this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
    }
  }
}
