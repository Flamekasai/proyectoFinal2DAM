import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCampaingPage } from './new-campaing.page';

describe('NewCampaingPage', () => {
  let component: NewCampaingPage;
  let fixture: ComponentFixture<NewCampaingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCampaingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
