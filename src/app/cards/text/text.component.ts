import { Component, OnInit, Input } from '@angular/core';

import { CardImplementation } from '../card.implementation';
import { Card } from '../card-item';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent extends CardImplementation implements OnInit {

  constructor() { super(); }

  ngOnInit() {}

  initDefaults(type: string) {
    super.initDefaults(type);
    this.data.value = 'Texto por defecto';
  }

}
