import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children:[
          {
            path:'',  
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: 'agregar-tarea/:ordenId/:importacionId',
            loadChildren: () => import('../agregar-tarea/agregar-tarea.module').then( m => m.AgregarTareaPageModule)
          }
        ] 
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
        
    {
      path: 'orden',
      children:[
        {path: 'orden-form/:orden',
        loadChildren: () => import('../orden-form/orden-form.module').then( m => m.OrdenFormPageModule)
      }
      ]
    },
  //      path: 'orden-form/:ordenId/:importacionId',

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
