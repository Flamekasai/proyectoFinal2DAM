import { Input } from '@angular/core';

import { ICard } from './card.interface';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextComponent } from './text/text.component';

export class CardImplementation implements ICard {
  @Input() data: any;
  parent;

  constructor(){}

  initDefaults(type: string) {
    this.data = {};
    this.data.title = 'Titulo por defecto';
    this.data.type = type;
  }

  delete() {
    this.parent.deleteComponent(this);
  }
}
