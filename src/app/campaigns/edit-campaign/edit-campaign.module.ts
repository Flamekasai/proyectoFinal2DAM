import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCampaignPageRoutingModule } from './edit-campaign-routing.module';

import { EditCampaignPage } from './edit-campaign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCampaignPageRoutingModule
  ],
  declarations: [EditCampaignPage]
})
export class EditCampaignPageModule {}
