import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { MoneyService } from './money.service';
import { SocketService } from './socket.service';
import { Socket } from 'ngx-socket-io';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient,
               private money: MoneyService,
               private socket: Socket ) { }

  private configUrl: string = 'http://localhost:9000/api/';
  private token = null;
  public currentUser: object;
  public role: string;

  registration(user): Observable<object> {
    return this.http.post(this.configUrl + 'registration', user).pipe(
      map((res)   => {
        localStorage.setItem('auth-token', res['token']);
        this.setToken(res['token']);

        this.socket.connect();
        this.socket.emit('CONNECT', this.token);

        return res;
      }),
      catchError((error:any) => throwError(error))
    );
  }

  login(form) {
    return this.http.post(this.configUrl+ 'login', form).pipe(
      map((res)   => {
        localStorage.setItem('auth-token', res['token']);
        this.setToken(res['token']);

        this.socket.connect();
        this.socket.emit('CONNECT', this.token);

        return res;
      }),
      catchError((error:any) => throwError(error))
    );
  }

  setToken(token) {
      this.token = token;
  }

  isAuth() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  logout() {
    return this.http.get(this.configUrl + 'logout').pipe(
      map((res)   => {
        localStorage.removeItem('auth-token');
        this.setToken(res['token']);
        this.currentUser = null;
        this.money.money = null;
        this.socket.disconnect();
        return res;
      }),
      catchError((error:any) => throwError(error))
    );
  }

  getCurrentUser() {
    return this.http.get(this.configUrl + 'currentUser').pipe(
      map((res)   => {
        this.currentUser = res;
        this.role = this.currentUser['role'];
        return res;
      }),
      catchError((error:any) => throwError(error))
    );
  }

  getUser() {
    return this.currentUser;
  }

  getRole() {
    return this.role;
  }

  updateUser(user, id) {
    return this.http.patch(this.configUrl + `user`, user).pipe(
      map((res)   => {
        this.currentUser = res;
        this.socket.emit('updateUser', this.currentUser, id);
        return res;
      }),
      catchError((error:any) => throwError(error))
    );
  }

  updateAvatar(formData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.configUrl + `user/avatar/${this.currentUser['id']}`, formData, {headers: headers})
      .pipe(
          map((res)   => {
            this.currentUser['avatar'] = res;
            this.socket.emit('updateUser', this.currentUser, this.currentUser['id']);
            return res;
          }),
          catchError((error:any) => throwError(error))
    );
  }

  getJobs() {
    return this.http.get(this.configUrl + 'jobs').pipe(
      map((res) => res),
      catchError((error:any) => throwError(error))
    );
  }

}
