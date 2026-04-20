import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarEquipoPage } from './agregar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarEquipoPageRoutingModule {}
