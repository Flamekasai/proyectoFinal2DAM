import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaingsPage } from './campaings.page';

const routes: Routes = [
  {
    path: '',
    component: CampaingsPage,
  },
  {
    path: 'new-campaing',
    loadChildren: () => import('./new-campaing/new-campaing.module').then( m => m.NewCampaingPageModule)
  },
  {
    path: 'edit-campaing',
    loadChildren: () => import('./edit-campaing/edit-campaing.module').then( m => m.EditCampaingPageModule)
  },
  {
    path: 'campaing-details',
    loadChildren: () => import('./campaing-details/campaing-details.module').then( m => m.CampaingDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaingsPageRoutingModule {}
