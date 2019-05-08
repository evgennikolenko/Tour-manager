import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSettingsComponent } from './tour-settings.component';

describe('TourSettingsComponent', () => {
  let component: TourSettingsComponent;
  let fixture: ComponentFixture<TourSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
