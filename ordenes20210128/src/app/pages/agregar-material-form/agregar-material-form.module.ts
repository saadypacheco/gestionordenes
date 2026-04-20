import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMaterialFormPageRoutingModule } from './agregar-material-form-routing.module';

import { AgregarMaterialFormPage } from './agregar-material-form.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMaterialFormPageRoutingModule,
    PipesModule,
    IonicSelectableModule

  ],
  declarations: [AgregarMaterialFormPage]
})
export class AgregarMaterialFormPageModule {}
