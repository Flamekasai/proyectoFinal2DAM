import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  private bIsEditing = false;

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

  onSignOut() { this.auth.signOut() }

}
