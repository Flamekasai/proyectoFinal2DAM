import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { UsersRepository } from '../../services/database/users-repository.service';

@Component({
  selector: 'app-new-campaing',
  templateUrl: './new-campaing.page.html',
  styleUrls: ['./new-campaing.page.scss'],
})
export class NewCampaingPage implements OnInit {
  private participantNames = ['Maria', 'Sarah'];

  constructor(private alertCtrl: AlertController, private usersRepository: UsersRepository) { }

  ngOnInit() {
  }

  addParticipant(participantId: string) {
    this.usersRepository.get(participantId)
    .then((user) => {
      if (user)
        this.participantNames.push(user.getName());
      else
        this.alertCtrl.create({
          header: 'Error',
          message: 'User not found',
          buttons: ['Ok']
        })
        .then(alert => { alert.present(); });
    })
  }
}
