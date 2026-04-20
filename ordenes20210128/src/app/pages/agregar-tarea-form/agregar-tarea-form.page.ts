import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrabajosService} from '../../services/trabajos.service';
import { NgForm } from '@angular/forms';
//import { Tarea } from 'src/app/models/tarea.model';
import { tarea } from 'src/app/interfaces/interfaces';
import { ordenItem, ordenInstalador } from 'src/app/interfaces/interfaces';
import { UIserviceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-agregar-tarea-form',
  templateUrl: './agregar-tarea-form.page.html',
  styleUrls: ['./agregar-tarea-form.page.scss'],
})
export class AgregarTareaFormPage implements OnInit {


@Input("orden") orden: ordenInstalador;

tareasTiposInicial:tarea[]=[]
  tareasTipos: tarea[]=[];
  tareaSelected : tarea;
  cantidad: number;
  searchString = '';
  tareas:tarea[]=[];
  

  constructor(private tareaCtrl:ModalController,
              private tareasService:TrabajosService ,
              private uiService: UIserviceService
              ) { }

  ngOnInit() {

    //this.tareasService.getTareas()
    
    this.tareas = [] //this.tareasService.listaTareas
  }
  
  buscarTarea(event:any){

    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.


    if (!text) {

      event.component.items = this.tareas;
      event.component.endSearch();
      return;
    }

    event.component.items = this.tareasService.listaTareas.filter(x=>{
      
      if (x.tareaId.toString().search(text)>=0 || x.descripcion.search(text)>=0){
        return x;
      }
    })
    event.component.endSearch();

  }
  cancelAddTarea(){
    this.tareaCtrl.dismiss();
  }

  saveNewTarea(fTarea: NgForm){


    if (this.tareaSelected === undefined || this.tareaSelected === null){

      return;
    }

    if (this.orden.tareas && this.orden.tareas.filter(x=> {return x.tareaId == this.tareaSelected.tareaId.toString()}).length > 0){
      this.uiService.alertInformacion("Tarea : </br>" + this.tareaSelected.descripcion +"</br>"+ " ya fue ingresada");
      return;
    }


    if (this.cantidad === undefined || this.cantidad <= 0){
      this.uiService.alertInformacion("Seleccione Cantidad")
      return;
    }
    this.tareaCtrl.dismiss({
      tareaId: this.tareaSelected.tareaId,
      cantidad: this.cantidad,
      descripcion: this.tareaSelected.descripcion
     });
  }

}
