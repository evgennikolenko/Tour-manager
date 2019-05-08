import {
  Component,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';

import { EmployeeService } from '../../../../../services/employee.service';

@Component({
  selector: 'app-select-employees',
  templateUrl: './select-employees.component.html',
  styleUrls: ['./select-employees.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectEmployeesComponent implements OnInit, OnChanges {
  @Input() employees;
  @Output() selectEmployee = new EventEmitter();
  @ViewChild('salary__label') salary__label: ElementRef;
  @ViewChild('employee__label') employee__label: ElementRef;

  constructor( private staff: EmployeeService) {}

  html = `<span class="btn-block btn-danger well-sm">Never trust not sanitized HTML!!!</span>`;

  private selectStaff;
  private salary;
  private error;

  select(employee) {
    this.selectStaff = employee;
    this.salary__label.nativeElement.checked = true;
  }

  ngOnChanges(changes): void {
    console.log('CJA', changes)
  }

  isActive(employee) {
    return this.selectStaff === employee;
  };

  onSelectEmployee(employee){

    if(!isNaN(+this.salary) && this.selectStaff && +this.salary > 0) {

      this.selectEmployee.emit({...employee, payment: +this.salary});
      this.selectStaff = null;
      this.salary = '';
      this.employee__label.nativeElement.checked = true;
    } else {
      this.error = 'Please, select employee or enter valid salary!'
    }
  }

  toolTip(employee) {
    return `<div><span>${employee.job['name']}</span></div>`
  }


  ngOnInit() {}

}
