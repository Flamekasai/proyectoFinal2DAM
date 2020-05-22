import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private bIsLogginMode = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  swapAuthMode() { this.bIsLogginMode = !this.bIsLogginMode; }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    const email = form.value.email;
    const password = form.value.password;
    let displayName = '';
    if (!this.bIsLogginMode) {
      displayName = form.value.displayName;
    }
    form.reset();
    if (!this.bIsLogginMode)
      this.authService.signUp(email, password, displayName)
    else
      this.authService.signIn(email, password);
  }

}
