import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'campaings',
        children: [
          {
            path: '',
            loadChildren: () => import('../campaings/campaings.module').then( m => m.CampaingsPageModule)
          },
          {
            path: 'new-campaing',
            loadChildren: () => import('../campaings/new-campaing/new-campaing.module').then(m => m.NewCampaingPageModule)
          },
          {
            path: 'edit-campaing/:campaingId',
            loadChildren: () => import('../campaings/edit-campaing/edit-campaing.module').then(m => m.EditCampaingPageModule)
          },
          {
            path: ':campaingId',
            loadChildren: () => import('../campaings/campaing-details/campaing-details.module').then(m => m.CampaingDetailsPageModule)
          }
        ]
      },
      {
        path: 'account',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
