import { Component, OnInit } from '@angular/core';

import { CardImplementation } from '../card.implementation';
import { Card } from '../card-item';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends CardImplementation implements OnInit {

  constructor() { super(); }

  ngOnInit() {}

  initDefaults(type: string) {
    super.initDefaults(type);
    this.data.value = [{text: 'Texto', checked: false}];
  }

  addCheckbox() {
    this.data.value.push({text: 'Texto', checked: false});
  }

  removeCheckbox(checkBoxToDelete) {
   let filteredArray = this.data.value
   .filter(arrayEntry => checkBoxToDelete !== arrayEntry );

   this.data.value = filteredArray;
  }

}
