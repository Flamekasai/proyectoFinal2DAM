import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UsersRepository } from '../../services/database/users-repository.service';
import { User } from '../../models/user.model';
import { CampaingsRepository } from '../../services/database/campaings-repository.service';
import { Campaing } from '../../models/campaing.model';

@Component({
  selector: 'app-new-campaing',
  templateUrl: './new-campaing.page.html',
  styleUrls: ['./new-campaing.page.scss'],
})
export class NewCampaingPage implements OnInit {
  private participants: User[] = [];
  private participantsIds: string[] = [];

  constructor(
    private alertCtrl: AlertController,
    private usersRepository: UsersRepository,
    private campaingsRepository: CampaingsRepository,
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
          message: 'User not found',
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

  createCampaing(form: NgForm) {
    if (!form.valid) return;

    const title = form.value.title;
    this.usersRepository.get(form.value.master)
    .then(master => {
      if (!master) {
        this.alertCtrl.create({
          header: 'Error',
          message: 'Master not found',
          buttons: ['Ok']
        })
        .then(alert => {
          alert.present();
        });

        return;
      }

      form.reset();
      let newCampaing = new Campaing('', title, master.getId(), this.participantsIds);
      this.campaingsRepository.create(newCampaing);
      this.router.navigateByUrl('/home/tabs/campaings');
    });

  }
}
