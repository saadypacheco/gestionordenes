import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarRecuperoFormPage } from './agregar-recupero-form.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarRecuperoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarRecuperoFormPageRoutingModule {}
