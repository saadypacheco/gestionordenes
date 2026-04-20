import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMaterialFormPage } from './agregar-material-form.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMaterialFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMaterialFormPageRoutingModule {}
