import { Type } from '@angular/core';

export class Card {
  constructor(public component: Type<any>, public type: string, public title: string, public value: any) {}
}
