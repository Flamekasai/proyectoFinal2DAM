import { Component, OnInit } from '@angular/core';

import { CardImplementation } from '../card.implementation';
import { Card } from '../card-item';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent extends CardImplementation implements OnInit {

  constructor() { super(); }

  ngOnInit() {}

}
