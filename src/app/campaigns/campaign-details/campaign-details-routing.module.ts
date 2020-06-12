import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignDetailsPage } from './campaign-details.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CampaignDetailsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
        .then( m => m.DashboardPageModule)
      },
      {
        path: 'character',
        loadChildren: () => import('./character/character.module')
        .then( m => m.CharacterPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignDetailsPageRoutingModule {}
