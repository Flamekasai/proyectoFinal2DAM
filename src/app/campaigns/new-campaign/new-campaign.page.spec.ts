import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCampaignPage } from './new-campaign.page';

describe('NewCampaignPage', () => {
  let component: NewCampaignPage;
  let fixture: ComponentFixture<NewCampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
