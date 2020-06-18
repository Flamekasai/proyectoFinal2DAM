import { Component, OnInit, Input } from '@angular/core';

import { CardImplementation } from '../card.implementation';
import { Card } from '../card-item';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent extends CardImplementation implements OnInit {
  private step: number = 0.1;

  constructor() { super(); }

  ngOnInit() {}

  initDefaults(type: string) {
    super.initDefaults(type);
    this.data.value = 0.5;
  }

  incrementValue() {
    let result = Number.parseFloat((this.data.value + this.step).toFixed(2));
    if (result <= 1) {
      this.data.value = result;
      console.log(result);
    }
  }

  decrementValue() {
    let result = Number.parseFloat((this.data.value - this.step).toFixed(2));
    if (result >= 0) {
      this.data.value = result;
      console.log(result);
    }
  }
}
