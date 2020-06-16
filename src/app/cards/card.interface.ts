import { Card } from './card-item';
export interface ICard {
  data: any;

  saveContents(index: number, campaignCards: Card[])
}
