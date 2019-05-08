import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { TourService } from '../../services/tour.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'staff-manage-dialog',
  templateUrl: './manage-staff-dialog.html',
  styleUrls: ['./manage-staff-dialog.scss']
})
export class StaffManageDialog implements OnInit{

  private employees: User[];

  private selected: User;
  private salary: string = '';
  private selectedEmployee: User;
  private error: string;

    constructor( public dialogRef: MatDialogRef<StaffManageDialog>,
                 private tour: TourService) {}

  onNoClick(): void {
      this.tour.cleanStaff();
      this.dialogRef.close();
  }

  isActive(employee) {
    return this.selected === employee;
  };

  selectEmployee(employee: User){
    this.selected = employee;
    this.selectedEmployee = employee;
  }

  addEmployee(){
    console.log('selectedEmployee', this.selectedEmployee)
    if(!isNaN(+this.salary) && this.selectedEmployee && +this.salary > 0) {
      this.selected = null;
      this.tour.selectStaffInTour({ ...this.selectedEmployee, payment: this.salary});
      this.salary = '';
      this.selectedEmployee = null;
    } else {
      this.error = 'Please, select employee or enter valid salary!'
    }
  }

  getSelected() {
    return this.tour.selectedEmployees;
  }

  deleteFromSelected(id){
    return this.tour.deleteFromSelected(id)
  }

  ngOnInit(): void {
      this.tour.getEmployees().subscribe(
        (users: User[]) => this.employees = users
      )
  }

}
