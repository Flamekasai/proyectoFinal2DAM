import { Component, OnInit, Input } from '@angular/core';

import { ICard } from '../card.interface';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit, ICard {

  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
