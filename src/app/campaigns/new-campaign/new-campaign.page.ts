import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UsersRepository } from '../../services/database/users-repository.service';
import { User } from '../../models/user.model';
import { CampaignsRepository } from '../../services/database/campaigns-repository.service';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.page.html',
  styleUrls: ['./new-campaign.page.scss'],
})
export class NewCampaignPage implements OnInit {
  private participants: User[] = [];
  private participantsIds: string[] = [];

  private bIsEditing: boolean = false;
  private currentId: string = '';
  private currentTitle: string = '';
  private currentMaster: string = '';
  private currentDashboard = [];
  private currentCharacters = [];

  constructor(
    private alertCtrl: AlertController,
    private usersRepository: UsersRepository,
    private campaignsRepository: CampaignsRepository,
    private router: Router,
    private url: ActivatedRoute) {
      this.url.params.subscribe(params => {
        if (params.campaignId) {
          this.bIsEditing = true;
          this.campaignsRepository.get(params.campaignId)
          .then(campaign => {
            this.currentId = campaign.getId();
            this.currentTitle = campaign.getTitle();
            this.currentMaster = campaign.getMaster();
            campaign.getParticipants().forEach(participant => {
              this.addParticipant(null, participant);
            });
            this.currentDashboard = campaign.getDashboard();
            this.currentCharacters = campaign.getCharacters();
          });
        }
      });
    }

    ngOnInit() {
    }

    addParticipant(participantInput, participantId) {
      if (participantId === '') return;

      this.usersRepository.get(participantId)
      .then((user) => {
        if (user) {
          this.participants.push(user);
          this.participantsIds.push(participantId);
        }
        else {
          this.alertCtrl.create({
            header: 'Error',
            message: 'No se ha encontrado el usuario.',
            buttons: ['Ok']
          })
          .then(alert => {
            alert.present();
          });
        }
      })
      if (participantInput)
        participantInput.value = '';
    }

    removeParticipant(participantId: string) {
      let newParticipants = this.participants
      .filter(currentParticipant => currentParticipant.getId() !== participantId);
      this.participants = newParticipants;

      let newParticipantsIds = this.participantsIds
      .filter(currentId => currentId !== participantId)
      this.participantsIds = newParticipantsIds;
    }

    onSubmit(form: NgForm) {
      if (!form.valid) return;

      const title = form.value.title;
      this.usersRepository.get(form.value.master)
      .then(master => {
        if (!master) {
          this.alertCtrl.create({
            header: 'Error',
            message: 'No se ha encontrado el master.',
            buttons: ['Ok']
          })
          .then(alert => {
            alert.present();
          });

          return;
        }

        form.reset();

        let participantsNames = [];
        this.participants.forEach(participant => {
          participantsNames.push(participant.getName());
        });

        let newCampaign = new Campaign(
          this.currentId,
          title,
          master.getId(),
          master.getName(),
          this.participantsIds,
          participantsNames,
          this.currentDashboard,
          this.currentCharacters
        );

        if (!this.bIsEditing)
          this.campaignsRepository.create(newCampaign);
        else
          this.campaignsRepository.update(newCampaign);

        this.router.navigateByUrl('/home/tabs/campaigns');
      });
    }
}
