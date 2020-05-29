import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

import { AuthGuard } from '../services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    // TODO: Restore comented lines
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'campaings',
        children: [
          {
            path: '',
            /* canLoad: [AuthGuard], */
            loadChildren: () => import('../campaings/campaings.module').then( m => m.CampaingsPageModule)
          },
          {
            path: 'new-campaing',
            /* canLoad: [AuthGuard], */
            loadChildren: () => import('../campaings/new-campaing/new-campaing.module').then(m => m.NewCampaingPageModule)
          },
          {
            path: 'edit-campaing/:campaingId',
            canLoad: [AuthGuard],
            loadChildren: () => import('../campaings/edit-campaing/edit-campaing.module').then(m => m.EditCampaingPageModule)
          },
          {
            path: ':campaingId',
            canLoad: [AuthGuard],
            loadChildren: () => import('../campaings/campaing-details/campaing-details.module').then(m => m.CampaingDetailsPageModule)
          }
        ]
      },
      {
        path: 'account',
        canLoad: [AuthGuard],
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: 'campaings',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/campaings',
    pathMatch: 'full'
  },  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
