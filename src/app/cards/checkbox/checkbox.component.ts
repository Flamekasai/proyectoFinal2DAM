import { Component, OnInit, Input } from '@angular/core';

import { ICard } from '../card.interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, ICard {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
