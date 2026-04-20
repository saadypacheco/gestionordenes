import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenFormPageRoutingModule } from './orden-form-routing.module';

import { OrdenFormPage } from './orden-form.page';

import { AgregarTareaPage } from '../agregar-tarea/agregar-tarea.page';
import { ComentariosFormPage } from '../comentarios-form/comentarios-form.page';
import { DatosFormPage } from '../datos-form/datos-form.page';
import { AgregarEquipoPage } from '../agregar-equipo/agregar-equipo.page';
import { AgregarRecuperoPage } from '../agregar-recupero/agregar-recupero.page';
import { AgregarMaterialPage } from '../agregar-material/agregar-material.page';
import { FotosPage } from '../fotos/fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenFormPageRoutingModule,
  
  ],
  declarations: [OrdenFormPage,  AgregarTareaPage,ComentariosFormPage,DatosFormPage,AgregarEquipoPage,AgregarMaterialPage,FotosPage,AgregarRecuperoPage]
})
export class OrdenFormPageModule {}
