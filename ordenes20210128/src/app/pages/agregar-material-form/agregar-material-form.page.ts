import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrabajosService} from '../../services/trabajos.service';
import { NgForm } from '@angular/forms';
//import { material } from 'src/app/models/material.model';
import { ordenItem, ordenInstalador,ordenItemMaterial, material } from 'src/app/interfaces/interfaces';
import { UIserviceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-agregar-material-form',
  templateUrl: './agregar-material-form.page.html',
  styleUrls: ['./agregar-material-form.page.scss'],
})
export class AgregarMaterialFormPage implements OnInit {

  @Input("orden") orden: ordenInstalador;

  materialSelected : material;
  cantidad: number;
  searchString = '';
  materiales:material[]=[];
  constructor(private materialCtrl:ModalController,
    private materialesService:TrabajosService ,
    private uiService: UIserviceService,
    private tServie:TrabajosService
    ) { }

  ngOnInit(

  ) {
    this.materiales =   this.tServie.listaMateriales;
  }
  buscarMaterial(event:any){

    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.


    if (!text ) {

      event.component.items = this.materiales;
      event.component.endSearch();
      return;
    }

    event.component.items = this.materialesService.listaMateriales.filter(x=>{

      if ( x.descripcion.toLowerCase().search(text)>=0 || (x.codigoSap && x.codigoSap.toString().search(text)>=0)
      ){
        return x;
      }
    })
    event.component.endSearch();

  }
  cancelAddMaterial(){
    this.materialCtrl.dismiss();
  }


  saveNewMaterial(fmaterial: NgForm){

    if (this.materialSelected === undefined || this.materialSelected === null){

      return;
    }

    if (this.orden.materiales && this.orden.materiales.filter(x=> {return x.materialId == this.materialSelected.materialId }).length > 0){
      this.uiService.alertInformacion("material : </br>" + this.materialSelected.descripcion +"</br>"+ " ya fue ingresada");
      return;
    }


    if (this.cantidad === undefined || this.cantidad <= 0){
      this.uiService.alertInformacion("Seleccione Cantidad")
      return;
    }
    this.materialCtrl.dismiss({
      materialId: this.materialSelected.materialId,
      cantidad: this.cantidad,
      descripcion: this.materialSelected.descripcion
     });
  }

}
