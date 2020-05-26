import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  private _bIsEditing = false;

  private currentEmail: string;
  private currentDisplayName: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let user = this.auth.getCurrentUser();
    this.currentEmail = user.getEmail();
    this.currentDisplayName = user.getName();
  }

}
