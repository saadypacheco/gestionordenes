import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosFormPage } from './comentarios-form.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosFormPageRoutingModule {}
