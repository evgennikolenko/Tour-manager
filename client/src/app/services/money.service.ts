import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor( private http: HttpClient ) { }

  private configUrl: string = 'http://localhost:9000/api/';

  public spentMoney: number;

  getManagersMoney(): Observable<number> {
    return this.http.get(this.configUrl + 'tours/manager/money').pipe(
      map((res) => this.money = res['spentMoney'])
    );
  }

  getEmployeeMoney(): Observable<number> {
    return this.http.get(this.configUrl + 'employee/earn-money').pipe(
      map((res) => this.money = res['earnMoney'])
    );
  }

  set money(count: number) {
    this.spentMoney = count;
  }

  get money(): number {
    return this.spentMoney;
  }
}
