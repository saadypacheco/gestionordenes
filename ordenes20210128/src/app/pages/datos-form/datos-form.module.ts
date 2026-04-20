import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosFormPageRoutingModule } from './datos-form-routing.module';

//import { DatosFormPage } from './datos-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosFormPageRoutingModule
  ],
  declarations: []
})
export class DatosFormPageModule {}
