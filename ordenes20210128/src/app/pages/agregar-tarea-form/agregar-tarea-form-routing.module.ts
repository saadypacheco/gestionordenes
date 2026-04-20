import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTareaFormPage } from './agregar-tarea-form.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AgregarTareaFormPage
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTareaFormPageRoutingModule {}
