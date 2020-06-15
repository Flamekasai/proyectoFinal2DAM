import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.page.html',
  styleUrls: ['./campaign-details.page.scss'],
})
export class CampaignDetailsPage implements OnInit {

  constructor(
    private url: ActivatedRoute,
    private router: Router,
    private detailsService: DetailsService) {
      this.url.params.subscribe(params => {
        this.detailsService.initializeCampaign(params.campaignId);
      });
    }

  ngOnInit() {
  }

}
