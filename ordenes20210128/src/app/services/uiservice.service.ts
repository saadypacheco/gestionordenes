import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIserviceService {

  constructor(private alertController: AlertController) { }

  async alertInformacion(message: string) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertConfirm(message: string, callback:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenciòn',
      message: '<strong>'+ message +'</strong>!!!',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'SI',
          handler: () => {
            callback();
          }
        }
      ]
    });

    await alert.present();
  }


}
