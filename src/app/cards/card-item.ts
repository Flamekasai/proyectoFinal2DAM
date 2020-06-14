import { Type } from '@angular/core';

export class Card {
  constructor(public component: Type<any>, public type: string, public value: any) {}
}
