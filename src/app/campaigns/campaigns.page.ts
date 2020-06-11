import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private alertCtrl: AlertController,
    private router: Router)
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

    editCampaign(campaignId: string) {
      this.router.navigate(['/home/tabs/campaigns/new-campaign', campaignId]);
    }

    leaveCampaign(campaignId: string) {
      this.campaignsRepository.get(campaignId).then(campaignToUpdate => {
        let newParticipants = campaignToUpdate.getParticipants()
        .filter(participant => {
          participant !== this.auth.getCurrentUser().getId()
        });

        let newParticipantsNames = campaignToUpdate.getParticipantsNames()
        .filter(participantName => {
          participantName !== this.auth.getCurrentUser().getName()
        });

        let updatedCampaign = new Campaign(
          campaignToUpdate.getId(),
          campaignToUpdate.getTitle(),
          campaignToUpdate.getMaster(),
          campaignToUpdate.getMasterName(),
          newParticipants,
          newParticipantsNames
        );

        this.campaignsRepository.update(updatedCampaign);

        let newCampaigns = this.campaigns
        .filter(currentCampaign => {
          currentCampaign.getId() !== campaignToUpdate.getId()
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
