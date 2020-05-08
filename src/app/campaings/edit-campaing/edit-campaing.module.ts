import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCampaingPageRoutingModule } from './edit-campaing-routing.module';

import { EditCampaingPage } from './edit-campaing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCampaingPageRoutingModule
  ],
  declarations: [EditCampaingPage]
})
export class EditCampaingPageModule {}
