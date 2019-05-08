import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInfoComponent } from './select-info.component';

describe('SelectInfoComponent', () => {
  let component: SelectInfoComponent;
  let fixture: ComponentFixture<SelectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
