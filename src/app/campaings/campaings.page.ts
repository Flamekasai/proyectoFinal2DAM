import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-campaings',
  templateUrl: './campaings.page.html',
  styleUrls: ['./campaings.page.scss'],
})
export class CampaingsPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
