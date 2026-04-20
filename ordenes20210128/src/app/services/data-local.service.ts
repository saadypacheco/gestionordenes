import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import {usuario, ordenInstalador, ordenItem,tarea, tareaInstalador, equipo, material} from './../interfaces/interfaces'


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  usuarioLogeado: usuario = null;  
  ordenes: ordenInstalador[]=[];
  tareas: tarea[]=[];
  equipos: equipo[]=[];
  materiales: material[]=[];
  constructor(private storage: Storage ) {
    

   }

  async saveOrdenes(orden:ordenInstalador){
   // let self = this
    if (this.ordenes == null){this.ordenes = [];}
    //si esta la orden primero la borro para luego agregarla modificada
    var removeIndex = this.ordenes.map(function(item) { return item.ordenId; }).indexOf(orden.ordenId);
    console.log('borro par insertar:', removeIndex)
    if (removeIndex !== undefined && removeIndex >= 0){
      console.log('borro par insertar:', removeIndex)
      this.ordenes.splice(removeIndex, 1);
    }


    this.ordenes.unshift(orden);
    this.storage.set('ordenes',this.ordenes);
 //   this.loadOrdenes();
  }
  getUsuario() : Promise<usuario>{
    return this.storage.get('usuario')
  }
  async loadOrdenes(){
    let self = this
    const ordenes = await self.storage.get('ordenes');
    self.ordenes = ordenes;
  }


  async clearOrdenes(){
    this.ordenes = [];
    this.storage.set('ordenes',this.ordenes);

  }


  getMateriales() : Promise<tareaInstalador[]>{
    return this.storage.get('materiales')
  }
  getEquipos() : Promise<tareaInstalador[]>{
    return this.storage.get('equipos')
  }
  getTareas() : Promise<tareaInstalador[]>{
    return this.storage.get('tareas')
  }
  getTiposTrabajos() : Promise<any[]>{
    return this.storage.get('tiposTrabajo')
  }

  setMateriales(equipos:any){
    this.storage.set('materiales',equipos);
  }

  setEquipos(equipos:any){
    this.storage.set('equipos',equipos);
  }

  setTareas(tareas:any){
    this.storage.set('tareas',tareas);
  }

  setTiposTrabajos(tiposTrabajo:any){
    this.storage.set('tiposTrabajo',tiposTrabajo);
  }

}
