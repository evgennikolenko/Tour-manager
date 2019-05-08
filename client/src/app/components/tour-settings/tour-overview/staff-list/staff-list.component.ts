import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnChanges {
  @Input() staff;
  @ViewChild("staffList")
  public staffList: ElementRef;

  constructor() { }

  ngOnChanges(changes): void {
    console.log('changes', changes, this.staff)
  }

  ngOnInit() {
  }

}
