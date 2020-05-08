import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCampaingPage } from './edit-campaing.page';

const routes: Routes = [
  {
    path: '',
    component: EditCampaingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCampaingPageRoutingModule {}
