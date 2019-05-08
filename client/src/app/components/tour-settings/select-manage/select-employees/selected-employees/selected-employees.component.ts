import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import { User } from '../../../../../models/user.model';
import { EmployeeService } from '../../../../../services/employee.service';

@Component({
  selector: 'app-selected-employees',
  templateUrl: './selected-employees.component.html',
  styleUrls: ['./selected-employees.component.scss']
})
export class SelectedEmployeesComponent implements OnInit {
  @Input() selectedEmployees: User[];
  @Output() deleteSelectedEmployee = new EventEmitter();

  constructor( private staff: EmployeeService) {}


  ngOnInit() {}

  onDeleteStaff(employee){
    this.deleteSelectedEmployee.emit(employee);
  }

}
