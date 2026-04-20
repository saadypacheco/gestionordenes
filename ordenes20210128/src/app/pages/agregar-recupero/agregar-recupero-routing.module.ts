import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarRecuperoPage } from './agregar-recupero.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarRecuperoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarRecuperoPageRoutingModule {}
