import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = null;
  private _currentUserSub = null;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this._currentUserSub = auth.user.subscribe(usr => {
      this._currentUser = usr;
    });
  }

  isUserLogged(): boolean { return this._currentUser !== null; }

  signIn(email: string, password: string) {
    let bAuthFailed = false;

    this.auth.signInWithEmailAndPassword(email, password).catch(err => {
      bAuthFailed = true;
      let errorCode = err.code;
      let errorMessage = err.message;
      if (errorCode === 'auth/invalid-email')
        console.log('The email addres is not valid');
      else if (errorCode === 'auth/user-disabled')
        console.log('You user has been disabled');
      else if (errorCode === 'auth/user-not-found')
        console.log('There is no user with this email');
      else if (errorCode === 'auth/wrong-password')
        console.log('Your password is incorrect or you didn\'t set a password to your acount');
    }).then(() => {
      if (!bAuthFailed)
        this.router.navigateByUrl('/home/tabs/campaings');
    });
  }

  signOut() {
    this.auth.signOut();
    this._currentUser = null;
    this.router.navigateByUrl('/home/login');
  }

  signUp(email: string, password: string, displayName: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
      console.log(userCredentials.user);
      this._currentUser = userCredentials.user;
    }).catch(err => {
      let errorCode = err.code;
      if (errorCode === 'auth/email-already-in-use')
        console.log('There\'s already an account with this email address');
      else if (errorCode === 'auth/invalid-email')
        console.log('The email addres is not valid');
      else if (errorCode === 'auth/operation-not-allowed')
        console.log('The operation is not allowed');
      else if (errorCode === 'auth/weak-password')
        console.log('Your password is too weak');
    });
  }
}
