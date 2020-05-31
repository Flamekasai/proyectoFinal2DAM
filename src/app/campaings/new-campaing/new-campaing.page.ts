import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { UsersRepository } from '../../services/database/users-repository.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-campaing',
  templateUrl: './new-campaing.page.html',
  styleUrls: ['./new-campaing.page.scss'],
})
export class NewCampaingPage implements OnInit {
  private participants: User[] = [];
  private participantsIds: string[] = [];

  constructor(private alertCtrl: AlertController, private usersRepository: UsersRepository) { }

  ngOnInit() {
  }

  addParticipant(participantId: string) {
    if (participantId === '')
      return;

    this.usersRepository.get(participantId)
    .then((user) => {
      if (user)
        this.participants.push(user);
      else
        this.alertCtrl.create({
          header: 'Error',
          message: 'User not found',
          buttons: ['Ok']
        })
        .then(alert => { alert.present(); });
    })
  }

  removeParticipant(participantId: string) {
    let newParticipants = this.participants
    .filter(currentParticipant => currentParticipant.getId() !== participantId);
    this.participants = newParticipants;
  }
}
