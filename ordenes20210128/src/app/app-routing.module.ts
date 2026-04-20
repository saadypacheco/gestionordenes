import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //revisar
    //canLoad: [UsuarioGuard]
  },
  {  // {
    //   path: 'agregar-orden',
    //   loadChildren: () => import('./pages/agregar-orden/agregar-orden.module').then( m => m.AgregarOrdenPageModule)
    // },
    // {
    //   path: 'agregar-tarea',
    //   loadChildren: () => import('./pages/agregar-tarea/agregar-tarea.module').then( m => m.AgregarTareaPageModule)
    // }
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'login'


  },
  
  {
    path: 'datos-form',
    loadChildren: () => import('./pages/datos-form/datos-form.module').then( m => m.DatosFormPageModule)
  },
  {
    path: 'comentarios-form',
    loadChildren: () => import('./pages/comentarios-form/comentarios-form.module').then( m => m.ComentariosFormPageModule)
  },
  {
    path: 'agregar-equipo',
    loadChildren: () => import('./pages/agregar-equipo/agregar-equipo.module').then( m => m.AgregarEquipoPageModule)
  },
  {
    path: 'agregar-equipo-form',
    loadChildren: () => import('./pages/agregar-equipo-form/agregar-equipo-form.module').then( m => m.AgregarEquipoFormPageModule)
  },
  {
    path: 'agregar-material',
    loadChildren: () => import('./pages/agregar-material/agregar-material.module').then( m => m.AgregarMaterialPageModule)
  },
  {
    path: 'agregar-material-form',
    loadChildren: () => import('./pages/agregar-material-form/agregar-material-form.module').then( m => m.AgregarMaterialFormPageModule)
  },
  {
    path: 'fotos',
    loadChildren: () => import('./pages/fotos/fotos.module').then( m => m.FotosPageModule)
  },
  {
    path: 'agregar-recupero',
    loadChildren: () => import('./pages/agregar-recupero/agregar-recupero.module').then( m => m.AgregarRecuperoPageModule)
  },
  {
    path: 'agregar-recupero-form',
    loadChildren: () => import('./pages/agregar-recupero-form/agregar-recupero-form.module').then( m => m.AgregarRecuperoFormPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
