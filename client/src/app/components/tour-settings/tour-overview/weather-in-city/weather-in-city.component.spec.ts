import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInCityComponent } from './weather-in-city.component';

describe('WeatherInCityComponent', () => {
  let component: WeatherInCityComponent;
  let fixture: ComponentFixture<WeatherInCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherInCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
