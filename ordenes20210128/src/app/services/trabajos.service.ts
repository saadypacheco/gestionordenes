import { Injectable } from '@angular/core';
import {Tarea} from '../models/tarea.model'
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {equipo, material, tarea, trabajo} from './../interfaces/interfaces'
import {tareaInstalador} from './../interfaces/interfaces'
import { UIserviceService } from './uiservice.service';
import { DataLocalService } from './data-local.service';

const URLTEST= environment.urltest;
const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  public listaTareas: any[]=[];
  public listaTipoTrabajo:any[]=[]
  public listaEquipos: any[]=[];
  public listaMateriales: any[]=[];
  

  constructor(private http:HttpClient, private uiService: UIserviceService, private dlService: DataLocalService) {

   }

   getEquipos(){

    if (this.listaEquipos && this.listaEquipos.length >0){
      return this.listaEquipos;
    }
    const path = `${URL}/listas/equiposEnDeposito/`;

      new Promise(resolve => {
        this.http.get<equipo>(path)
          .subscribe(resp => {
            this.listaEquipos= resp[0] 
            this.dlService.setEquipos(this.listaEquipos)
            return this.listaEquipos
          },
          err => {    
            //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')

            this.dlService.getEquipos().then(x => { 
              this.listaEquipos = x
              return this.listaEquipos
            })
          });
        
      })
   }

   getMateriales(){

    if (this.listaEquipos && this.listaEquipos.length >0){
      return this.listaEquipos;
    }
    const path = `${URL}/listas/materiales/`;

      new Promise(resolve => {
        this.http.get<material>(path)
          .subscribe(resp => {
            this.listaMateriales= resp[0] 
            this.dlService.setMateriales(this.listaMateriales)
            return this.listaMateriales;
          },
          err => {    
            //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')

            this.dlService.getMateriales().then(x => { 
              this.listaMateriales = x
              return this.listaMateriales
            })
          });
        
      })
   }

   //WorKerApp
   getTareas(){

    if (this.listaTareas && this.listaTareas.length >0){
      return this.listaTareas;
    }
    const path = `${URL}/listas/tareas/`;

      new Promise(resolve => {
        this.http.get<tarea>(path)
          .subscribe(resp => {
            this.listaTareas= resp[0] 
            this.dlService.setTareas(this.listaTareas)
            return this.listaTareas
          },
          err => {    
            //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')

            this.dlService.getTareas().then(x => { 
              this.listaTareas = x
              return this.listaTareas
            })
          });
        
      })
   }


  getTipoTrabajo(){
  //  return this.http.get(`${ URL }/listas/tTrabajo`);
    const path = `${ URL }/listas/tTrabajo`;
    return new Promise (resolve => {
      this.http.get<trabajo>(path)
        .subscribe(resp => {
          this.listaTipoTrabajo= resp[0]
          this.dlService.setTiposTrabajos(this.listaTipoTrabajo)
          resolve( this.listaTipoTrabajo)
        },(err) => {
          //console.log(err);
          //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tipos de trabajo')
          this.dlService.getTiposTrabajos().then(x => { 
            this.listaTipoTrabajo = x
        //    console.log(this.listaTipoTrabajo)
            return this.listaTipoTrabajo
          });
        })  ;
      
    })
  }


  // para quitar luego.
  getPostsTest(){
    return this.http.get(`${ URL }/todos/`);
  }

    getTarea(id: string | number) {

      id= Number(id);
    //  console.log(id);
      return this.listaTareas.find(listaData => listaData.tareaId === id );
    }
      

   saveStorage(tareas:tareaInstalador[]){
    // localStorage.setItem('tareas',tareas);

   }
   loadStorege(){
    this.listaTareas= [];
     if (localStorage.getItem('data')){
        this.listaTareas = JSON.parse(localStorage.getItem('data'));
     }
   } 
}
