import { Input } from '@angular/core';

import { ICard } from './card.interface';

export class CardImplementation implements ICard {
  @Input() data: any;

  constructor(){}

  delete() {

  }
}
