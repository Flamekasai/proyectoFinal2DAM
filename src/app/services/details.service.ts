import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model'
import { CampaignsRepository } from '../services/database/campaigns-repository.service';

// Este servicio existe unicamente porque Ionic es idiota.
@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private campaignId: string = ''

  constructor(private campaignsRepository: CampaignsRepository) { }

  initializeCampaign(campaignId: string) {
    this.campaignId = campaignId;
  }

  getCampaignId() {
    return this.campaignId;
  }
}
