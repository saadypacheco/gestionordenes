import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { equipo,ordenInstalador } from 'src/app/interfaces/interfaces';

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
  selector: 'app-agregar-recupero-form',
  templateUrl: './agregar-recupero-form.page.html',
  styleUrls: ['./agregar-recupero-form.page.scss'],
})
export class AgregarRecuperoFormPage implements OnInit {

  @Input("orden") orden: ordenInstalador;

  equipoSelected : equipo;
  descripcion: string;
  equipos:equipo[]=[];
  nroSerie:string;
  tempImage: string | any;
  imagenId:string;
  id = uuid();
  
  constructor(    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private sanitizer:DomSanitizer,
    private equipoCtrl:ModalController,
    private uiService: UIserviceService,
    private ordenesService:OrdenesService,
) { }

  ngOnInit() {
  }

  cancelAddEquipo(){
    this.equipoCtrl.dismiss();
  }

  saveNewEquipo(fEquipo:NgForm){

    if (this.tempImage && this.tempImage.length > 1 && this.nroSerie.length == 0 ){
       this.uiService.alertInformacion("Debe ingresar un numero de serie");
    }     
    
      this.equipoSelected ={equipoId:undefined,nroSerie: this.nroSerie,materialId:2416,descripcion:"",src:this.tempImage}     
    this.equipoSelected.imagenId = this.imagenId;
   this.equipoCtrl.dismiss(this.equipoSelected);

 }
 scanner(){
   this.barcodeScanner.scan().then(barcodeData => {
     console.log('Barcode data', barcodeData);
     this.nroSerie = barcodeData.text;

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
