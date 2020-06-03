import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCampaignPageRoutingModule } from './new-campaign-routing.module';

import { NewCampaignPage } from './new-campaign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCampaignPageRoutingModule
  ],
  declarations: [NewCampaignPage]
})
export class NewCampaignPageModule {}
