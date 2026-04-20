import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { str2ab } from 'src/app/functions/funciones';
import { ordenItemMaterial, ordenInstalador, ModoGrabadoOrden, equipo } from 'src/app/interfaces/interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { AgregarEquipoFormPage } from '../agregar-equipo-form/agregar-equipo-form.page';
import { DomSanitizer } from '@angular/platform-browser';
import { stringify } from 'querystring';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.page.html',
  styleUrls: ['./agregar-equipo.page.scss'],
})
export class AgregarEquipoPage implements OnInit {
  @Input("orden") orden: ordenInstalador;
  @Input("color") parentColor: string;

  private equipo:equipo;
  public guardar:boolean;
  public cargando:boolean=true;

  constructor(private ordenesService:OrdenesService,
    private route: ActivatedRoute ,
    private modalTarea: ModalController,
    private uiService:UIserviceService,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.guardar= false;
    this.cargando = true
    this.cargarImagenes();
  }
  async addEquipo(){

       const modal= await this.modalTarea.create({
        component: AgregarEquipoFormPage,
        componentProps: {
          'orden': this.orden      }
      });

      await modal.present();
      const {data} = await modal.onDidDismiss();
     // console.log('Datos para grabar la tarea',data );
      if (data === undefined) {return};

      if (this.orden.equipos === undefined){
        this.orden.equipos = [];
      }

      data.imagen = "";
      this.orden.equipos.push(data);
      this.ordenesService.grabarSincronizar(this.orden,ModoGrabadoOrden.TODO).then(x=> {
                   
         }).catch( x=>{
           this.uiService.alertInformacion("NO SE PUDO AGREGAR EL EQUIPO") 
      })
           
  }
  deleteEquipo(index:any){
    if (this.orden.estadoId == 15){
      this.orden.equipos.splice(index,1);
      this.guardar = true
    }
    else {
      this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
    }

  }

  cargarImagenes(){

    let _img ="";
    this.orden.equipos.forEach(x => {
      if (x.imagenId  && x.imagenId.length > 0 && x.imagen !=null){
        const img = str2ab(x.imagen)

        const blob = new Blob([img], { type: x.mimeType });
  
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
             _img = reader.result.toString()
              x.src=this.sanitizer.bypassSecurityTrustUrl(_img);
           //   x.imagen = "";
        }
    
      }
    });
    this.cargando = false;

  }

}
