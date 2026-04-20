import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosFormPage } from './datos-form.page';

const routes: Routes = [
  {
    path: '',
    component: DatosFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosFormPageRoutingModule {}
