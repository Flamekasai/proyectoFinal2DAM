import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsPage } from './campaigns.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignsPage,
  },
  {
    path: 'new-campaign',
    loadChildren: () => import('./new-campaign/new-campaign.module').then( m => m.NewCampaignPageModule)
  },
  {
    path: 'edit-campaign',
    loadChildren: () => import('./edit-campaign/edit-campaign.module').then( m => m.EditCampaignPageModule)
  },
  {
    path: 'campaign-details',
    loadChildren: () => import('./campaign-details/campaign-details.module').then( m => m.CampaignDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsPageRoutingModule {}
