import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Rx from "rxjs";
import { Tour } from '../models/tour.model';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient) { }


  private configUrl: string = 'http://localhost:9000/api/';

  getInvitations() {
    return this.http.get(this.configUrl + 'invitations').pipe(
      map((res: Tour[]) => res.map((tour: Tour) => new Tour().deserialize(tour))
      )
    );
  }

  invitationWasAdded(socket) {
    let observable = new Observable(observer => {
      socket.on('sendInvitationToCurrent', (data) => {
        observer.next(data);
      });
    });

    let observer = {
      next: (data: Object) => {
        return data;
      },
    };

    return Rx.Subject.create(observer, observable);
  }

  changeInvitation(tourId, status) {
    return this.http.patch(this.configUrl + `employee/tour-invitation/${tourId}`, status).pipe(
      map(() => console.log(status['invitationStatus']))
    );
  }

  public selectedEmployees = [];
  public employees = [];

  getEmployees(): Observable<User[]> {
    return this.http.get( this.configUrl + 'employees').pipe(
      map((res: User[]) => res.map((user: User) => {
        this.employees.push(new User().deserialize(user));
        return new User().deserialize(user) }))
    )
  }

  set staffInTour(user) {
    this.selectedEmployees.push(user);
  }

  get staffInTour(): User[] {
    return this.selectedEmployees;
  }

  public selectStaff(employee){
    this.employees = this.employees.filter((item) => item.id !== employee.id)
  }

  public deleteFromSelected(id) {
    this.selectedEmployees = this.selectedEmployees.filter((employee) => employee.id !== id)
  }

  public cleanStaff() {
    this.selectedEmployees = [];
    this.employees = [];
  }


}
