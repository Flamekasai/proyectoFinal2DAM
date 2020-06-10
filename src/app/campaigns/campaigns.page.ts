import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../services/auth/auth.service';

import { UsersRepository } from '../services/database/users-repository.service';
import { User } from '../models/user.model';
import { CampaignsRepository } from '../services/database/campaigns-repository.service';
import { Campaign } from '../models/campaign.model';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
})
export class CampaignsPage implements OnInit {
  private campaigns: Campaign[] = [];

  constructor(
    private auth: AuthService,
    private campaignsRepository: CampaignsRepository,
    private usersRepository: UsersRepository,
    private alertCtrl: AlertController)
  {
    this.campaignsRepository.getAll().subscribe(campaigns => {
      this.campaigns = [];

      campaigns.forEach(data => {
        let campaign = Campaign.fromCampaign(data);
        let userId = this.auth.getCurrentUser().getId();

        if (campaign.getMaster() === userId ||
            campaign.getParticipants().includes(userId))
          this.campaigns.push(campaign);
      });

    });
  }

    ngOnInit() {
    }

    leaveCampaign(campaignId: string) {
      this.campaignsRepository.get(campaignId).then(updatedCampaign => {
        let newParticipants = updatedCampaign.getParticipants()
        .filter(participant => {
          participant !== this.auth.getCurrentUser().getId()
        });

        let newParticipantsNames = updatedCampaign.getParticipantsNames()
        .filter(participantName => {
          participantName !== this.auth.getCurrentUser().getName()
        });

        this.campaignsRepository.update(
          updatedCampaign.getId(),
          updatedCampaign.getTitle(),
          updatedCampaign.getMaster(),
          updatedCampaign.getMasterName(),
          newParticipants,
          newParticipantsNames
        );

        let newCampaigns = this.campaigns
        .filter(currentCampaign => {
          currentCampaign.getId() !== updatedCampaign.getId()
        });

        this.campaigns = newCampaigns;
      });
    }

    deleteCampaign(campaignId: string) {
      this.campaignsRepository.delete(campaignId);

      let newCampaigns = this.campaigns
      .filter(currentCampaign => currentCampaign.getId() !== campaignId)
      this.campaigns = newCampaigns;
    }
}
