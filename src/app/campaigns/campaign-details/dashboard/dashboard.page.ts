import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import {
  CardImplementation
} from '../../../cards/card.implementation';
import {
  Card
} from '../../../cards/card-item';
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
  private components: CardImplementation[] = [];

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

  updateComponents() {
    this.container.clear();
    for (let component of this.components) {
      const factory = this.resolver.resolveComponentFactory(
        Campaign.resolveComponentName(component.data.type)
      );
      let componentRef = this.container.createComponent(factory);
      let updatedComponent = (componentRef.instance as CardImplementation);
      updatedComponent.parent = this;
      updatedComponent.data = {
        type: component.data.type,
        title: component.data.title,
        value: component.data.value
      };
      component = updatedComponent;
    }
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
      newDashboard
    );
    this.campaignsRepository.update(campaign);
  }

  deleteComponent(componentToDelete: CardImplementation) {
    let newArray = this.components
    .filter(component => component !== componentToDelete);
    if (newArray.length === 0) {
      this.container.clear();
      this.components = [];
    } else {
      this.components = newArray;
      this.updateComponents();
    }
  }

}
