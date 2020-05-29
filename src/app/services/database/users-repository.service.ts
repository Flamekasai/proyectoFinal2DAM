import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository {
  private collection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<User>('users');
    this.users = this.collection.valueChanges();
  }

  add(user: User) {
    this.collection.doc(user.getId()).set({
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName()
    });
  }

  get(id: string) {
    let docRef = this.afs.collection('users').doc(id);

    let user = docRef.get().toPromise()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No se encontro el usuario.')
        return null;
      }

      let data = doc.data();
      return new User(data.id, data.email, data.name);
    });

    return user;
  }
}
