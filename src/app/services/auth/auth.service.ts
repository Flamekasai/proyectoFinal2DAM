import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { UsersRepository } from '../database/users-repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseUser = null;
  private firebaseUserSub = null;
  private currentUser: User = null;

  constructor(private auth: AngularFireAuth,
              private router: Router,
              private alertCtrl: AlertController,
              private usersRepository: UsersRepository) {
                this.firebaseUserSub = auth.user.subscribe(usr => {
                  this.firebaseUser = usr;
                });
              }

  isUserLogged(): boolean { return this.currentUser !== null; }

  getCurrentUser() { return this.currentUser; }

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
        this.firebaseUser = userCredentials.user;
        this.currentUser = new User(this.firebaseUser.uid, this.firebaseUser.email, this.firebaseUser.displayName);
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
    this.firebaseUser = null;
    this.currentUser = null;
    this.router.navigateByUrl('/home/login');
  }

  signUp(email: string, password: string, displayName: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      userCredentials.user.updateProfile({ displayName: displayName })
      .then( () => {
        this.firebaseUser = userCredentials.user;
        let newUser = new User(this.firebaseUser.uid, this.firebaseUser.email, this.firebaseUser.displayName);
        this.usersRepository.add(newUser);
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
