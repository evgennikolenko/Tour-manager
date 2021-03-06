import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyPanelComponent } from './money-panel.component';

describe('MoneyPanelComponent', () => {
  let component: MoneyPanelComponent;
  let fixture: ComponentFixture<MoneyPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
