import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCampaignPage } from './edit-campaign.page';

describe('EditCampaignPage', () => {
  let component: EditCampaignPage;
  let fixture: ComponentFixture<EditCampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCampaignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
