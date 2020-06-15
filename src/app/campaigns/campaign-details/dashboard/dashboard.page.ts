import {
  Component,
  OnInit,
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
export class DashboardPage implements OnInit {
  private campaign: Campaign = null;

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

  renderComponents() {
    let cards = this.campaign.getDashboard();
    for (let card of cards) {
      const factory = this.resolver.resolveComponentFactory(card.component);
      let componentRef = this.container.createComponent(factory);
      (componentRef.instance as ICard).data = card.value;
    }
  }

}
