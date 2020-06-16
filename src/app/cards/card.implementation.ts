import { Input } from '@angular/core';

import { ICard } from './card.interface';
import { Card } from './card-item';

export class CardImplementation implements ICard {
  @Input() data: any;

  constructor(){}

  saveContents(index: number, campaignCards: Card[]) {
    let card = campaignCards[index];
    if (card.title !== this.data.title || card.value !== this.data.value){
      card.title = this.data.title;
      card.value = this.data.value;
    }
  }
}
