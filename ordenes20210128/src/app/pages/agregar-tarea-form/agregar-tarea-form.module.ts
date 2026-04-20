import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTareaFormPageRoutingModule } from './agregar-tarea-form-routing.module';

import { AgregarTareaFormPage } from './agregar-tarea-form.page';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTareaFormPageRoutingModule,
    PipesModule,
    IonicSelectableModule
  ],
  declarations: [AgregarTareaFormPage]
})
export class AgregarTareaFormPageModule {}
