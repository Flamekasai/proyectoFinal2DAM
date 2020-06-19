import {
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import { CardImplementation } from '../../cards/card.implementation';
import { Card } from '../../cards/card-item';

import { Campaign } from '../../models/campaign.model';
import { CampaignsRepository } from '../../services/database/campaigns-repository.service';

import { DetailsService } from '../../services/details.service';

import { CheckboxComponent } from '../../cards/checkbox/checkbox.component';
import { NumberComponent } from '../../cards/number/number.component';
import { ProgressComponent } from '../../cards/progress/progress.component';
import { TextComponent } from '../../cards/text/text.component';

export class CardListPage {
  protected campaign: Campaign = null;
  protected components: CardImplementation[] = [];
  protected container;

  constructor(
    protected campaignsRepository: CampaignsRepository,
    protected resolver: ComponentFactoryResolver,
    protected detailsService: DetailsService
  ) {}

  updateComponents() {
    this.container.clear();
    let oldArray = this.components;
    this.components = [];
    for (let component of oldArray) {
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
      this.components.push(updatedComponent);
    }
  }

  addComponent(type: string) {
    let componentToAdd;
    if (type === 'checkbox')
      componentToAdd = new CheckboxComponent();
    else if (type === 'number')
      componentToAdd = new NumberComponent();
    else if (type === 'progress')
      componentToAdd = new ProgressComponent();
    else if (type === 'text')
      componentToAdd = new TextComponent();
    componentToAdd.initDefaults(type);
    componentToAdd.parent = this;
    this.components.push(componentToAdd)
    this.updateComponents();
  }

  deleteComponent(componentToDelete: CardImplementation) {
    if (this.components.length === 1) {
      this.container.clear();
      this.components = [];
    } else {
      let newArray = this.components
      .filter(component => {
        if (
          component.data.title !== componentToDelete.data.title
        || component.data.type !== componentToDelete.data.type
        || component.data.value !== componentToDelete.data.value
        ) {
          return true;
        } else {
          return false;
        }
      });
      this.components = newArray;
      this.updateComponents();
    }
  }

}
