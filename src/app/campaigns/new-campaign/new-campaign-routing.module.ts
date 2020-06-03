import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCampaignPage } from './new-campaign.page';

const routes: Routes = [
  {
    path: '',
    component: NewCampaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCampaignPageRoutingModule {}
