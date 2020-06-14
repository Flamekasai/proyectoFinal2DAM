import { Component, OnInit, Input } from '@angular/core';

import { ICard } from '../card.interface';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent implements OnInit, ICard {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
