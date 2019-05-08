import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPalcesComponent } from './select-palces.component';

describe('SelectPalcesComponent', () => {
  let component: SelectPalcesComponent;
  let fixture: ComponentFixture<SelectPalcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPalcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPalcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
