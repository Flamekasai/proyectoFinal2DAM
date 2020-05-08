import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCampaingPageRoutingModule } from './new-campaing-routing.module';

import { NewCampaingPage } from './new-campaing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCampaingPageRoutingModule
  ],
  declarations: [NewCampaingPage]
})
export class NewCampaingPageModule {}
