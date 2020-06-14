import { Component, OnInit, Input } from '@angular/core';

import { ICard } from '../card.interface';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit, ICard {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
