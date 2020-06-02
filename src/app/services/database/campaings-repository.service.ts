import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Campaing } from '../../models/campaing.model';

@Injectable({
  providedIn: 'root'
})
export class CampaingsRepository {
  private collection: AngularFirestoreCollection<Campaing>;
  private campaings: Observable<Campaing[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Campaing>('campaings');
    this.campaings = this.collection.valueChanges();
  }

  create(campaing: Campaing) {
    campaing.setId(this.afs.createId());
    this.collection.doc(campaing.getId()).set({
      id: campaing.getId(),
      title: campaing.getTitle(),
      master: campaing.getMaster(),
      participants: campaing.getParticipants()
    });
  }

  get(id: string) {
    let docRef = this.collection.doc(id);

    return docRef.get().toPromise()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No se encontro la partida.');
        return null;
      }

      let data = doc.data();
      return new Campaing(data.id, data.title, data.master, data.participants);
    });
  }

  update(id: string, title: string, master: string, participants: string[]) {
    let docRef = this.collection.doc(id);
    return docRef.update({title: title, master: master, participants: participants});
  }

  delete(id: string) {
    let docRef = this.collection.doc(id);
    return docRef.delete()
    .catch(() => {
      console.log('Failed deleting the campaing.');
    });
  }
}
