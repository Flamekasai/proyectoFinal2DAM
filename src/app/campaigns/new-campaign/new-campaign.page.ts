import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private alertCtrl: AlertController,
    private usersRepository: UsersRepository,
    private campaignsRepository: CampaignsRepository,
    private router: Router) { }

  ngOnInit() {
  }

  addParticipant(participantInput) {
    let participantId = participantInput.value;

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
        .then(alert => { alert.present(); });
      }
    })
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

  checkMaster(masterId: string) {
  }

  createCampaign(form: NgForm) {
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
      let newCampaign = new Campaign('', title, master.getId(), this.participantsIds);
      this.campaignsRepository.create(newCampaign);
      this.router.navigateByUrl('/home/tabs/campaigns');
    });

  }
}
