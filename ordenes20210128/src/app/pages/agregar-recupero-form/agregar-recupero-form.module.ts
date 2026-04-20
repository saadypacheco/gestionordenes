import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRecuperoFormPageRoutingModule } from './agregar-recupero-form-routing.module';

import { AgregarRecuperoFormPage } from './agregar-recupero-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRecuperoFormPageRoutingModule
  ],
  declarations: [AgregarRecuperoFormPage]
})
export class AgregarRecuperoFormPageModule {}
