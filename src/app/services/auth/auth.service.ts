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

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController,
    private usersRepository: UsersRepository) {
      this.firebaseUserSub = auth.user.subscribe(usr => {
        this.firebaseUser = usr;
      });
    }

    isUserLogged(): boolean { return this.currentUser !== null; }

    refreshCurrentUser() {
      this.currentUser =
        new User(
          this.firebaseUser.uid,
          this.firebaseUser.email,
          this.firebaseUser.displayName
      );
    }
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
          this.refreshCurrentUser();
          this.router.navigateByUrl('/home/tabs/campaigns');
        }
      })
      .catch(err => {
        bAuthFailed = true;
        let errorCode = err.code;
        let errorMessage = err.message;
        if (errorCode === 'auth/invalid-email')
          this.showAlert(
            'Email inválido',
            'Esa cuenta de correo no existe o no es válida.'
          );
        else if (errorCode === 'auth/user-disabled')
          this.showAlert(
            'Usuario deshabilitado',
            'El usuario al que intentas acceder ha sido deshabilitado.'
          );
        else if (errorCode === 'auth/user-not-found')
          this.showAlert(
            'No se encuentra el usuario',
            'No existe ningún usuario con esa cuenta.'
          );
        else if (errorCode === 'auth/wrong-password')
          this.showAlert(
            'Contraseña equivocada',
            'La contraseña que has introducido no es correcta.'
          );
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
          this.refreshCurrentUser();
          let newUser = new User(
            this.firebaseUser.uid,
            this.firebaseUser.email,
            this.firebaseUser.displayName
          );
          this.usersRepository.create(newUser);
          this.signIn(email, password);
        }, (err) => {
          console.log(err);
        });
      })
      .catch(err => {
        let errorCode = err.code;
        if (errorCode === 'auth/email-already-in-use')
          this.showAlert(
            'Usuario en uso',
            'Ya existe un usuario con ese email.'
          );
        else if (errorCode === 'auth/invalid-email')
          this.showAlert(
            'Email inválido',
            'Esa cuenta de correo no es válida.'
          );
        else if (errorCode === 'auth/operation-not-allowed')
          this.showAlert(
            'Operación no permitida',
            'Esa operación no esta permitida.'
          );
        else if (errorCode === 'auth/weak-password')
          this.showAlert(
            'Contraseña débil',
            'La contraseña es muy sencilla.'
          );
      });
    }

    update(id: string, email: string, name: string){
      if ( id === this.currentUser.getId() ) {
        this.firebaseUser.updateProfile({displayName: name})
        .then(newData => {
          this.refreshCurrentUser();
        });
      }

      this.usersRepository.update(id, this.currentUser.getEmail(), name);
    }

    delete() {
      this.usersRepository.delete(this.currentUser.getId())
      .then(() => {
        this.firebaseUser.delete()
        .then(() => {
          this.signOut();
        })
      });
    }
}
