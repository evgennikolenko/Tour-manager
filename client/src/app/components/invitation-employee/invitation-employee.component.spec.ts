import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationEmployeeComponent } from './invitation-employee.component';

describe('InvitationEmployeeComponent', () => {
  let component: InvitationEmployeeComponent;
  let fixture: ComponentFixture<InvitationEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
