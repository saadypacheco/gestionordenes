import { Component, OnInit, Input } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ordenInstalador, ModoGrabadoOrden, ordenItemMaterial } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
//import { AgregarTareaFormPage } from '../agregar-tarea-form/agregar-tarea-form.page';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { AgregarMaterialFormPage } from '../agregar-material-form/agregar-material-form.page';
import { TrabajosService } from 'src/app/services/trabajos.service';



@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.page.html',
  styleUrls: ['./agregar-material.page.scss'],
})
export class AgregarMaterialPage implements OnInit {

  @Input("orden") orden: ordenInstalador;
  @Input("color") parentColor: string;

  listaMateriales: any[]=[];
  nombreItemmaterial='';  
  material: ordenItemMaterial;

  constructor(private ordenesService:OrdenesService,
    private route: ActivatedRoute ,
    private modalMaterial: ModalController,
    private uiService:UIserviceService) { 
}

  ngOnInit() {

  }
  async addMaterial(){
    const modal= await this.modalMaterial.create({
      component: AgregarMaterialFormPage,
      componentProps: {
        'orden': this.orden      }

    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
   // console.log('Datos para grabar la tarea',data );
    if (data === undefined) {return};
    let _material  ={
      materialId: data.materialId,
      medidaInicial: 0,
      medidaFinal: 0,
      nroSerie: undefined,
      nroSerieR:undefined,
      tipoConsumoId: 1,
      cantidad:data.cantidad,
      descripcion: data.descripcion,
      Cantidad: data.cantidad,
      descriopcion: data.descripcion
    }
    if (this.orden.materiales === undefined){
      this.orden.materiales = [];
    }

    if (this.orden.materiales.filter(x=> {return x.materialId == data.materialId}).length === 0){
console.log(_material)
      this.orden.materiales.push(_material);
      this.ordenesService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then(x=> {
      
     //     this.uiService.alertInformacion("tarea agregada")  
            
      }).catch( x=>{
        this.uiService.alertInformacion("NO SE PUDO AGREGAR TAREA") 
      })
    }
 
  }
  deleteMaterial(i:number){
    if (this.orden.estadoId == 15){
      this.orden.materiales.splice(i,1);
      this.ordenesService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then(x=> {
      this.uiService.alertInformacion("tarea eliminada")         
    })
    }
    else {
      this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
    }
  }

}
