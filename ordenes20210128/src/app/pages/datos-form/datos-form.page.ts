import { Component, OnInit, Input } from '@angular/core';
import { ordenInstalador, ModoGrabadoOrden } from 'src/app/interfaces/interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { UIserviceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-datos-form',
  templateUrl: './datos-form.page.html',
  styleUrls: ['./datos-form.page.scss'],
})
export class DatosFormPage implements OnInit {
  @Input("orden") orden: ordenInstalador;
  @Input("color") parentColor: string;
  tipoTrabajos: any;

  
  constructor(private ordenService: OrdenesService, 
    public dataService: TrabajosService,
    private uiService: UIserviceService ) {

      
     }

  ngOnInit() {  }

  saveNewOrden(){

      this.ordenService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then((res:any)=>{
        this.uiService.alertInformacion("datos modificados")  
      });;

    
  }

}
