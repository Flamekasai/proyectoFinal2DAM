import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

import { CardImplementation } from '../../../cards/card.implementation';
import { Card } from '../../../cards/card-item';

import { Campaign } from '../../../models/campaign.model';
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
    protected detailsService: DetailsService,
    protected pickerCtrl: PickerController
  ) { super(campaignsRepository, resolver, detailsService, pickerCtrl); }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.campaignsRepository.get(this.detailsService.getCampaignId())
    .then(campaign => {
      this.campaign = campaign;
      this.components = [];
      this.container.clear();
      let cards = this.campaign.getDashboard();
      for (let card of cards) {
        const factory = this.resolver.resolveComponentFactory(card.component);
        let componentRef = this.container.createComponent(factory);
        let component = (componentRef.instance as CardImplementation);
        component.parent = this;
        component.data = {type: card.type, title: card.title, value: card.value};
        this.components.push(component);
      }
    });
  }

  ionViewWillLeave() {
    this.saveChanges();
  }

  ngOnDestroy() {
    this.saveChanges();
  }

  saveChanges() {
    let newDashboard = [];
    this.components.forEach(component => {
      let card = new Card(
        Campaign.resolveComponentName(component.data.type),
        component.data.type,
        component.data.title,
        component.data.value
      );
      newDashboard.push(card);
    });
    let campaign = new Campaign(
      this.campaign.getId(),
      this.campaign.getTitle(),
      this.campaign.getMaster(),
      this.campaign.getMasterName(),
      this.campaign.getParticipants(),
      this.campaign.getParticipantsNames(),
      newDashboard,
      this.campaign.getCharacters()
    );
    this.campaignsRepository.update(campaign);
  }

}
