import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _firebaseUser = null;
  private _firebaseUserSub = null;
  private _currentUser: User = null;

  constructor(private auth: AngularFireAuth, private router: Router, private alertCtrl: AlertController) {
    this._firebaseUserSub = auth.user.subscribe(usr => {
      this._firebaseUser = usr;
    });
  }

  isUserLogged(): boolean { return this._currentUser !== null; }

  getCurrentUser() { return this._currentUser; }

  showAlert(header: string, message: string) {
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    })
    .then( alert => {
      alert.present();
    })
  }

  signIn(email: string, password: string) {
    let bAuthFailed = false;

    this.auth.signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      if (!bAuthFailed) {
        this._firebaseUser = userCredentials.user;
        this._currentUser = new User(this._firebaseUser.uid, this._firebaseUser.email, this._firebaseUser.displayName);
        this.router.navigateByUrl('/home/tabs/campaings');
      }
    })
    .catch(err => {
      bAuthFailed = true;
      let errorCode = err.code;
      let errorMessage = err.message;
      if (errorCode === 'auth/invalid-email')
        this.showAlert('Invalid Email', 'The email addres is not valid');
      else if (errorCode === 'auth/user-disabled')
        this.showAlert('User disabled', 'You user has been disabled');
      else if (errorCode === 'auth/user-not-found')
        this.showAlert('User not found', 'There is no user with this email');
      else if (errorCode === 'auth/wrong-password')
        this.showAlert('Invalid password', 'Your password is incorrect or you didn\'t set a password to your acount');
    });
  }

  signOut() {
    this.auth.signOut();
    this._firebaseUser = null;
    this._currentUser = null;
    this.router.navigateByUrl('/home/login');
  }

  signUp(email: string, password: string, displayName: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      userCredentials.user.updateProfile({ displayName: displayName })
      .then( () => {
        this._firebaseUser = userCredentials.user;
        this.signIn(email, password);
      }, (err) => {
        console.log(err);
      });
    })
    .catch(err => {
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
