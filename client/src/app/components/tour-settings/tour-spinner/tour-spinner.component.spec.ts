import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSpinnerComponent } from './tour-spinner.component';

describe('TourSpinnerComponent', () => {
  let component: TourSpinnerComponent;
  let fixture: ComponentFixture<TourSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
