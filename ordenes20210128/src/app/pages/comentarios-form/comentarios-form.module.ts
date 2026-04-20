import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosFormPageRoutingModule } from './comentarios-form-routing.module';

//import { ComentariosFormPage } from './comentarios-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosFormPageRoutingModule
  ],
  declarations: []
})
export class ComentariosFormPageModule {}
