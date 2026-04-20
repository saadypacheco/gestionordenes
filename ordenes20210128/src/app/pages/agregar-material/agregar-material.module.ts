import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMaterialPageRoutingModule } from './agregar-material-routing.module';

import { AgregarMaterialPage } from './agregar-material.page';
import { AgregarMaterialFormPageModule } from '../agregar-material-form/agregar-material-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMaterialPageRoutingModule,
    AgregarMaterialFormPageModule
  ],
  declarations: []
})
export class AgregarMaterialPageModule {}
