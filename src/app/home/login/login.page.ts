import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service'

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private bIsLogginMode = true;

  constructor(private authService: AuthService, private alertCtrl: AlertController) {}

  ngOnInit() {}

  swapAuthMode() { this.bIsLogginMode = !this.bIsLogginMode; }

  getCurrentModeName() { return this.bIsLogginMode ? 'Sign in' : 'Sign up'; }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }

    const email = form.value.email;
    const password = form.value.password;
    let displayName = '';
    let password2 = form.value.password2;

    if (!this.bIsLogginMode) {
      displayName = form.value.displayName;
      password2 = form.value.password2;

      if (password2 != password) {
        this.alertCtrl.create({
          header: 'Passwords don\'t match',
          message: 'You have to match both passwords.',
          buttons: ['OK']
        })
        .then( alert => {
          alert.present();
        });
        return;
      }

    }

    form.reset();
    if (!this.bIsLogginMode) {
      this.authService.signUp(email, password, displayName);
      this.bIsLogginMode = true;
    } else {
      this.authService.signIn(email, password);
    }

  }

}
