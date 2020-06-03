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
        path: 'campaigns',
        children: [
          {
            path: '',
            /* canLoad: [AuthGuard], */
            loadChildren: () => import('../campaigns/campaigns.module').then( m => m.CampaignsPageModule)
          },
          {
            path: 'new-campaign',
            /* canLoad: [AuthGuard], */
            loadChildren: () => import('../campaigns/new-campaign/new-campaign.module').then(m => m.NewCampaignPageModule)
          },
          {
            path: 'edit-campaign/:campaignId',
            canLoad: [AuthGuard],
            loadChildren: () => import('../campaigns/edit-campaign/edit-campaign.module').then(m => m.EditCampaignPageModule)
          },
          {
            path: ':campaignId',
            canLoad: [AuthGuard],
            loadChildren: () => import('../campaigns/campaign-details/campaign-details.module').then(m => m.CampaignDetailsPageModule)
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
        redirectTo: 'campaigns',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/campaigns',
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
