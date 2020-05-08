import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampaingsPage } from './campaings.page';

describe('CampaingsPage', () => {
  let component: CampaingsPage;
  let fixture: ComponentFixture<CampaingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
