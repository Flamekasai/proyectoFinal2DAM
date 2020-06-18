import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import { CampaignsRepository } from '../../../services/database/campaigns-repository.service';

import { DetailsService } from '../../../services/details.service';
import { CardListPage } from '../card-list.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends CardListPage implements OnInit, OnDestroy {

  @ViewChild('cardContainer', {read: ViewContainerRef, static: true}) container;

  constructor(
    protected campaignsRepository: CampaignsRepository,
    protected resolver: ComponentFactoryResolver,
    protected detailsService: DetailsService
  ) { super(campaignsRepository, resolver, detailsService); }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.onInit()
  }

  ionViewWillLeave() {
    this.saveChanges();
  }

  ngOnDestroy() {
    this.saveChanges();
  }

}
