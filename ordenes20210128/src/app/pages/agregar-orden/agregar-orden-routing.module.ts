import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarOrdenPage } from './agregar-orden.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarOrdenPageRoutingModule {}
