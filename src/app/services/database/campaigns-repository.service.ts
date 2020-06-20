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
      participantsNames: campaign.getParticipantsNames(),
      dashboard: Campaign.cardArrayToJson(campaign.getDashboard()),
      characters: Campaign.charactersToJson(campaign.getCharacters())
    });
  }

  getAll() {
    return this.campaigns;
  }

  get(id: string) {
    let docRef = this.collection.doc(id);

    return docRef.get().toPromise()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No se encontro la partida.');
        return null;
      }

      let data = doc.data() as Campaign;
      return Campaign.fromCampaign(data);
    });
  }

  update(campaign: Campaign) {
    let docRef = this.collection.doc(campaign.getId());
    return docRef.update({
      title: campaign.getTitle(),
      master: campaign.getMaster(),
      masterName: campaign.getMasterName(),
      participants: campaign.getParticipants(),
      participantsNames: campaign.getParticipantsNames(),
      dashboard: Campaign.cardArrayToJson(campaign.getDashboard()),
      characters: Campaign.charactersToJson(campaign.getCharacters())
    });
  }

  delete(id: string) {
    let docRef = this.collection.doc(id);
    return docRef.delete()
    .catch(() => {
      console.log('Failed deleting the campaign.');
    });
  }
}
