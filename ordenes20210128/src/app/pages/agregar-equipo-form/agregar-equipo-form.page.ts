import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { equipo, ordenInstalador } from 'src/app/interfaces/interfaces';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { UIserviceService } from 'src/app/services/uiservice.service';
import { NgForm } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { v4 as uuid } from 'uuid';

declare var window: any

@Component({
  selector: 'app-agregar-equipo-form',
  templateUrl: './agregar-equipo-form.page.html',
  styleUrls: ['./agregar-equipo-form.page.scss'],
})
export class AgregarEquipoFormPage implements OnInit {
  @Input("orden") orden: ordenInstalador;

 // equipo:equipo;
  equipoSelected : equipo;
  descripcion: string;
  searchString = '';
  equipos:equipo[]=[];
  abonado:boolean= false;
  nroSerie:string;
  tempImage: string | any;
  imagenId:string;
  id = uuid();
  constructor(private equipoCtrl:ModalController,
    private trabajoService:TrabajosService ,
    private uiService: UIserviceService,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private sanitizer:DomSanitizer,
    private ordenesService:OrdenesService,) { }

  ngOnInit() {
    this.abonado = false;
  }


  buscarEquipo(event:any){

    let text = event.text.trim().toUpperCase();
    event.component.startSearch();

    // Close any running subscription.


    if (!text || text.length < 4) {

      event.component.items = this.equipos;
      event.component.endSearch();
      return;
    }

    event.component.items = this.trabajoService.listaEquipos.filter(x=>{
      //console.log(x);
      if (x.nroSerie.toUpperCase().search(text)>=0){
        return x;
      }
    })
    event.component.endSearch();

  }

  cancelAddEquipo(){
    this.equipoCtrl.dismiss();
  }
  saveNewEquipo(fEquipo:NgForm){

     if (this.tempImage && this.tempImage.length > 1 && this.nroSerie.length == 0 ){
        this.uiService.alertInformacion("Debe ingresar un numero de serie");
     }     
     
     if (this.abonado){
       this.equipoSelected ={equipoId:undefined,nroSerie: this.nroSerie,materialId:2416,descripcion:"",abonado:this.abonado,src:this.tempImage}     
     }
     this.equipoSelected.imagenId = this.imagenId;
    this.equipoCtrl.dismiss(this.equipoSelected);

  }
  scanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.nroSerie = barcodeData.text;
      let _equipo = this.trabajoService.listaEquipos.filter(x=>{
        //console.log(x);
        if (x.nroSerie.toUpperCase().search(this.nroSerie)>=0){
          return x;
        }
      })[0];

      if (_equipo) { this.equipoSelected = _equipo }
      else {this.uiService.alertInformacion("Equipo no disponible:"+ barcodeData.text);}

      return
     }).catch(err => {
         console.log('Error', err);
         this.uiService.alertInformacion(err);
        });
  }
  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
    this.imagenId=uuid();
    const img = window.Ionic.WebView.convertFileSrc( imageData );
    this.ordenesService.subirImagen(imageData,this.orden.ordenId.toString(),this.imagenId)
    this.tempImage= this.sanitizer.bypassSecurityTrustUrl(img);

    }, (err) => {
      console.log(err);
    });
  }


}
