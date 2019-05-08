import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LogInCheckingGuard implements CanActivate, CanActivateChild{
  constructor( private auth: AuthService,
               private router: Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuth()) {
      return of(false)
    } else {
      return of(true)
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }
}
