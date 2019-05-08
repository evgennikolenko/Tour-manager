import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {Tour} from '../models/tour.model';
import {User} from '../models/user.model';
import {Place} from '../models/place.model';
import * as underscore from 'underscore';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient,
              private socket: Socket) {
  }

  private configUrl: string = 'http://localhost:9000/api/';

  public selectedEmployees: User[] = [];

  public selectedPlaces: Place[] = [];


  getTours(sort, item, limit?, page?): Observable<Tour[]> {
    limit = limit || this.limit;

    return this.http.get(this.configUrl + `manager/tours?sort=${sort}&item=${item}&limit=${limit}&page=${page}`).pipe(
      map((res: Tour[]) => res.map((tour: Tour) => new Tour().deserialize(tour)))
    )
  }

  getToursCount(): Observable<object> {
    return this.http.get(this.configUrl + 'manager/tours/count');
  }

  getEmployeeTours(sort, item, limit?, page?): Observable<Tour[]> {
    return this.http.get(this.configUrl + `employee/tours?sort=${sort}&item=${item}&limit=${limit}&page=${page}`).pipe(
      map((res: Tour[]) => res.map((tour: Tour) => {
        console.log('tours', tour)
        return new Tour().deserialize(tour)
      }))
    )
  }

  getEmployeeToursCount(): Observable<object> {
    return this.http.get(this.configUrl + 'employee/tours/count');
  }

  createTour(tour) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.configUrl + 'tour/create', tour, {headers: headers}).pipe(
      map((item) => {
        console.log('CREATE', item);
        this.socket.emit('sendInvitations', item)
      })
    )
  }

  updateTour(id, tour) {
    console.log(JSON.stringify(tour))
    return this.http.patch(this.configUrl + `manager/tour/update/${id}`, tour).pipe(
      map((item) => {
        console.log('update', item)
      })
    )
  }

  getTour(id) {
    return this.http.get(this.configUrl + `manager/tour/${id}`).pipe(
      map((tour: Tour) => new Tour().deserialize(tour))
    )
  }

  // tour-board <==================
  public limit: number;
  public page: number;
  public sortValue: string;

  public set tourLimit(limit: number) {
    this.limit = limit;
  }

  public get tourLimit(): number {
    return this.limit;
  }

  public set pageIndex(page: number) {
    this.page = page;
  }

  public get pageIndex(): number {
    return this.page;
  }

  public set selectedSortItem(item: string) {
    this.sortValue = item;
  }

  public get selectedSortItem(): string {
    return this.sortValue;
  }

  // staff <====================

  getEmployees(): Observable<User[]> {
    return this.http.get(this.configUrl + 'employees').pipe(
      map((res: User[]) => res.map((user: User) => new User().deserialize(user)))
    )
  }

  public selectStaffInTour(user) {
    this.selectedEmployees.push(user);
  }

  public deleteFromSelected(id) {
    this.selectedEmployees = this.selectedEmployees.filter((employee) => {
      console.log(employee.id)
      console.log(id)
      return employee.id !== id
    })
  }

  public cleanStaff() {
    this.selectedEmployees = [];
  }

  // Places <===========

  getPlaces(): Observable<Place[]> {
    return this.http.get(this.configUrl + 'places').pipe(
      map((res: Place[]) => res.map((place: Place) => new Place().deserialize(place))))
  }

  public selectPlace(place: Place) {
    let deleted: boolean = false;

    this.selectedPlaces.map((item) => {
      if (underscore._.isEqual(item, place)) {
        deleted = true;
        this.selectedPlaces = this.selectedPlaces.filter((item) => item['id'] !== place['id'])
      }
    });

    if (!deleted) {
      this.selectedPlaces.push(place);
    }
  }

  public cleanPlaces() {
    this.selectedPlaces = [];
  }

  getWeather(place): Observable<object> {
    return this.http.post(this.configUrl + 'place-weather', place);
  }

}
