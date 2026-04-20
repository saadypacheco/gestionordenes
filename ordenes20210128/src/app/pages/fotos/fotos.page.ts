import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ordenInstalador, ModoGrabadoOrden, imagen } from 'src/app/interfaces/interfaces';

import { OrdenesService } from 'src/app/services/ordenes.service';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { v4 as uuid } from 'uuid';
import { str2ab } from 'src/app/functions/funciones';

declare var window: any

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {
  @Input("orden") orden: ordenInstalador;
  @Input("color") parentColor: string;
  public guardar:boolean;
  public cargando:boolean;
  fotos: any[]=[];
  id:string;

  constructor(public ordeneService: OrdenesService,
    private route: ActivatedRoute ,
    private navPage: NavController,
    private uiService: UIserviceService,
    private camera: Camera,
    private ordenesService:OrdenesService,
    private sanitizer:DomSanitizer,) { }

  async ngOnInit() {
    this.guardar= false;
    this.cargando = true;
    if (!this.orden.imagenes){
      this.ordeneService.getImagenes(this.orden.ordenId.toString()).subscribe(imagenes=>{
       // console.log(imagenes)

        this.orden.imagenes = imagenes[0];
        this.orden.imagenes.forEach(x => {
          const img = str2ab(x.imagen)

          const blob = new Blob([img], { type: x.mimeType });

          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
                const urlSanetizada = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString())
                this.fotos.push(urlSanetizada);
          }

        })
        this.cargando = false;
    })

    }
    else {
      this.orden.imagenes.forEach(x => {
        const img = str2ab(x.imagen)

        const blob = new Blob([img], { type: x.mimeType });

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.fotos.push(this.sanitizer.bypassSecurityTrustUrl(reader.result.toString()));
        }
        this.cargando = false;
      })

    }

  }

  gallery(){


    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {



    if (this.fotos.length <= 4){
      this.id=uuid();
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      this.ordenesService.subirImagen(imageData,this.orden.ordenId.toString(),this.id)
     
      this.fotos.push (this.sanitizer.bypassSecurityTrustUrl(img));        
     }   
     else{
        this.guardar = false;
     }
    }, (err) => {
      console.log(err);
    });







  }
  saveFotos(){

    

  }  
  /*
  str2ab(str ) {
    const arr = str.split(',');
    const view = new Uint8Array(arr);
    return view.buffer;
  }
*/
}

 

