import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarEquipoFormPageRoutingModule } from './agregar-equipo-form-routing.module';

import { AgregarEquipoFormPage } from './agregar-equipo-form.page';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarEquipoFormPageRoutingModule,
    PipesModule,
    IonicSelectableModule
  ],
  declarations: [AgregarEquipoFormPage]
})
export class AgregarEquipoFormPageModule {}
