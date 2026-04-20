import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarOrdenPageRoutingModule } from './agregar-orden-routing.module';
import { AgregarOrdenPage } from './agregar-orden.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarOrdenPageRoutingModule,

    
  ],
  declarations: [AgregarOrdenPage]
})
export class AgregarOrdenPageModule {}
