import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenFormPage } from './orden-form.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenFormPageRoutingModule {}
