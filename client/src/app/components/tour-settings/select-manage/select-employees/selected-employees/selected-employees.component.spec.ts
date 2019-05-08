import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEmployeesComponent } from './selected-employees.component';

describe('SelectedEmployeesComponent', () => {
  let component: SelectedEmployeesComponent;
  let fixture: ComponentFixture<SelectedEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
