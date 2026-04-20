import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { AgregarOrdenPage } from '../agregar-orden/agregar-orden.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AgregarOrdenPageModule } from '../agregar-orden/agregar-orden.module';

@NgModule({
  entryComponents:[
    AgregarOrdenPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    AgregarOrdenPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
