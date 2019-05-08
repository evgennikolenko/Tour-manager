import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttachmentComponent } from './select-attachment.component';

describe('SelectAttachmentComponent', () => {
  let component: SelectAttachmentComponent;
  let fixture: ComponentFixture<SelectAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
