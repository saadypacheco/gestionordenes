import { Component, OnInit, Input } from '@angular/core';
import { ordenInstalador, ModoGrabadoOrden } from 'src/app/interfaces/interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UIserviceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-comentarios-form',
  templateUrl: './comentarios-form.page.html',
  styleUrls: ['./comentarios-form.page.scss'],
})
export class ComentariosFormPage implements OnInit {
  @Input("orden") orden: ordenInstalador;
  @Input("color") parentColor: string;
  
  constructor(private ordenService: OrdenesService, private uiService: UIserviceService) { }

  ngOnInit() {
  //  console.log(this.orden)
  }

  saveNewOrden(){
   
    this.ordenService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then((res:any)=>{
      this.uiService.alertInformacion("datos modificados")  
    });;

  
  }
}
