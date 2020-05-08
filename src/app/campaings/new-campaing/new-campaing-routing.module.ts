import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCampaingPage } from './new-campaing.page';

const routes: Routes = [
  {
    path: '',
    component: NewCampaingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCampaingPageRoutingModule {}
