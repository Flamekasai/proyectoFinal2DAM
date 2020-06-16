import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import {
  ICard
} from '../../../cards/card.interface';
import {
  Campaign
} from '../../../models/campaign.model';
import {
  CampaignsRepository
} from '../../../services/database/campaigns-repository.service';
import {
  DetailsService
} from '../../../services/details.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  private campaign: Campaign = null;
  private components: ICard[] = [];

  @ViewChild('cardContainer', {read: ViewContainerRef, static: true}) container;
  constructor(
    private campaignsRepository: CampaignsRepository,
    private resolver: ComponentFactoryResolver,
    private detailsService: DetailsService) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.campaignsRepository.get(this.detailsService.getCampaignId())
    .then(campaign => {
      this.campaign = campaign;
      this.renderComponents();
    });
  }

  ionViewWillLeave() {
    this.saveChanges();
  }

  ngOnDestroy() {
    this.saveChanges();
  }

  saveChanges() {
    for (let component of this.components) {
      component.saveContents(
        this.components.indexOf(component),
        this.campaign.getDashboard()
      );
    }
    this.campaignsRepository.update(this.campaign);
  }

  renderComponents() {
    this.container.clear();
    this.components = [];
    let cards = this.campaign.getDashboard();
    for (let card of cards) {
      const factory = this.resolver.resolveComponentFactory(card.component);
      let componentRef = this.container.createComponent(factory);
      let component = (componentRef.instance as ICard);
      component.data = {title: card.title, value: card.value};
      this.components.push(component);
    }
  }

}
