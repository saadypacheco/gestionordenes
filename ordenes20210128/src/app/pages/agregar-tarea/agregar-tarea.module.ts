import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTareaPageRoutingModule } from './agregar-tarea-routing.module';

import { AgregarTareaPage } from './agregar-tarea.page';
//import {AgregarTareaFormPage} from '../agregar-tarea-form/agregar-tarea-form.page';
import { AgregarTareaFormPageModule } from '../agregar-tarea-form/agregar-tarea-form.module';

@NgModule({
  entryComponents:[
 //   AgregarTareaFormPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTareaPageRoutingModule,
    AgregarTareaFormPageModule
  ],
  declarations: []
})
export class AgregarTareaPageModule {}
