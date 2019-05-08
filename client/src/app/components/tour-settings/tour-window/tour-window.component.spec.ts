import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourWindowComponent } from './tour-window.component';

describe('TourWindowComponent', () => {
  let component: TourWindowComponent;
  let fixture: ComponentFixture<TourWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
