import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Storage } from '@ionic/storage'
import { environment } from '../../environments/environment.prod';
import {usuario} from './../interfaces/interfaces'
import { NavController } from '@ionic/angular';
import { UIserviceService } from './uiservice.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { fechaHoyStr } from '../functions/funciones';
const URL = environment.url;
//const URL = "http://localhost:8796/api"
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private lgn:any;
  private xmovilid:string = null;
  public  usuarioTmp :usuario={}        ;
  public usuario: usuario={};
  public mensaje:string = ''
  public xalias:string

  constructor(private http: HttpClient,
            private storage: Storage,
            private navCtrl: NavController,
            private uiService: UIserviceService  ) {
            }

  async getUltimoUsuario():Promise<any>{

    return new Promise(async resolve => { 
       this.loadUserStorage().then(x=> {
        if (this.lgn != undefined && this.lgn != null)
        resolve(this.lgn)

       });
    });
    
  }
  login(xalias:string, xpass:string){
    const self = this;
    const data = {"xalias":xalias,"xpass":xpass}
   // this.storage.set('lgn',data);
    let errorMessage = "";

      return new Promise(resolve => {

        this.http.post<usuario>(`${ URL }/usuarios/login`,data)
        .subscribe(resp => {  

          if (resp[0].length > 0){

            if (this.usuarioTmp == null)
              this.usuarioTmp = {};
            Object.assign(this.usuarioTmp , resp[0][0]);
            if (this.usuarioTmp.fecha!= undefined){
              this.usuarioTmp.fecha = this.usuarioTmp.fecha.substring(0,10);
            }
            self.usuario  = self.usuarioTmp;

            if (this.usuarioTmp.movilId === null)  {
              this.mensaje = 'No tiene asignado un movil';

              resolve(false);    
            }
            else{

              this.saveUser(this.usuarioTmp,data);
              resolve(true);
            }  
          }
          else {

              this.mensaje = 'Usuario y/o contraseña no son correctos'; 
              resolve(false);    
        
          }


  
       },
       async err =>{
         console.log(err);
         this.uiService.alertInformacion("no se pudo conectar");

         if (err instanceof ErrorEvent) {
          // client-side error
          this.mensaje = `Client-side error: ${err.error.message}`;
         
        } else {
          // backend error
          this.mensaje = `Server-side error: ${err.status} ${err.message} </br> ${err.error}`;
        
          console.log(err.error)
        }

        // si no tiene red me fijo si el usuario se ya se logueo en el dia
        await  this.loadUserStorage();
        if (this.usuarioTmp){
          
          if (  this.lgn && this.lgn.xalias == data.xalias && this.lgn.xpass == data.xpass)


            if (this.usuarioTmp.fecha == fechaHoyStr()){
              this.usuario  = this.usuarioTmp;          
              resolve(true);
              }
            else{
              resolve(false);
              this.mensaje = '<b>Error:</b> </br>' +'Usuario no tiene movil asignado'
            }

          }
          else{
            //this.storage.clear();
            resolve(false);
            //this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'Usuario y/o contraseña no son correctos')
            this.mensaje = '<b>Error de conexión:</b> </br>' +'Usuario y/o contraseña no son correctos'

          }
       });
       
      });      
  }

  async saveUser(usuario: usuario , lgn:any){
    this.usuarioTmp = usuario;

      await this.storage.set('usuario',usuario);
      await this.storage.set('lgn',lgn);
  }

  // busco al usuario del storage para validar
  // esto se necesita para controlar hasta cuando es valido el storage.
  async loadUserStorage(){
/*
    this.storage.get('usuario').then( x => {
      this.usuarioTmp = x
      console.log(x)
      this.storage.get('lgn').then (y=>{ 
        this.lgn = y
        console.log(y)
      }) 
    }

    )
 */
       this.usuarioTmp = await this.storage.get('usuario')|| null;
   this.lgn = await this.storage.get('lgn')|| null;
  }


  // falta un servicio: dado un idusuario , me devuelva el movilid
  async validarUser(): Promise<boolean>{

    // busco al usuario legeado en mi localstorage
    await this.loadUserStorage();

    // si no recupera a ninguno entonces lo manda a loggin
    if(!this.usuarioTmp){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
     }
      


     return new Promise<boolean> (resolve =>{


      resolve(true);


    });

  }
            
  }
  


