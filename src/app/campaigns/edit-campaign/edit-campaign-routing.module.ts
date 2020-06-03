import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCampaignPage } from './edit-campaign.page';

const routes: Routes = [
  {
    path: '',
    component: EditCampaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCampaignPageRoutingModule {}
