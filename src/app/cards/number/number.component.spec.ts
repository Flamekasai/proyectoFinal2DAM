import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumberComponent } from './number.component';

describe('NumberComponent', () => {
  let component: NumberComponent;
  let fixture: ComponentFixture<NumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
