import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRecuperoPageRoutingModule } from './agregar-recupero-routing.module';

import { AgregarRecuperoPage } from './agregar-recupero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRecuperoPageRoutingModule
  ],
  declarations: [AgregarRecuperoPage]
})
export class AgregarRecuperoPageModule {}
