import { Component, OnInit, Input } from '@angular/core';

import { CardImplementation } from '../card.implementation';
import { Card } from '../card-item';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent extends CardImplementation implements OnInit {

  constructor() { super(); }

  ngOnInit() {}

}
