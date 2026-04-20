import { Component,OnInit } from '@angular/core';
import { TrabajosService } from '../../services/trabajos.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ordenInstalador } from 'src/app/interfaces/interfaces';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
}) 
export class Tab2Page implements OnInit{

  ordenes:ordenInstalador[];

  constructor(public usuarioService: UsuarioService,
    public ordeneService: OrdenesService,
    private navPage: NavController,
    private uiService: UIserviceService) {}
  
  ngOnInit(){

  }

  ionViewWillEnter(){
    this.ordenes = this.ordeneService.ordenes.filter(x=>{ return x.sincronizado === false})
  }

  sincronizar(){
    this.ordeneService.sincronizar().subscribe(x=>{
      document.body.setAttribute('color-theme','dark')
      this.navPage.navigateRoot('/main/tabs/tab1',{animated:true});    
    }, err =>{

      this.uiService.alertInformacion("<b>Error al sincronizar: </b></r>"+ err.message)
    })
  }
}
