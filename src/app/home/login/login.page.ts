import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    const email = form.value.email;
    const password = form.value.password;
    form.reset();
    this.authService.login(email, password);
  }

}
