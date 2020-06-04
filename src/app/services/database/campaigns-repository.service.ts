import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Campaign } from '../../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignsRepository {
  private collection: AngularFirestoreCollection<Campaign>;
  private campaigns: Observable<Campaign[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Campaign>('campaigns');
    this.campaigns = this.collection.valueChanges();
  }

  create(campaign: Campaign) {
    campaign.setId(this.afs.createId());
    this.collection.doc(campaign.getId()).set({
      id: campaign.getId(),
      title: campaign.getTitle(),
      master: campaign.getMaster(),
      masterName: campaign.getMasterName(),
      participants: campaign.getParticipants(),
      participantsNames: campaign.getParticipantsNames()
    });
  }

  getAll() {
    return this.collection.get().toPromise();
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
      return new Campaign(
        data.id,
        data.title,
        data.master,
        data.masterName,
        data.participants,
        data.participantsNames
      );
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
      console.log('Failed deleting the campaign.');
    });
  }
}
