import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate, CanActivateChild{
  constructor( private auth: AuthService,
               private router: Router,
               public jwtHelper: JwtHelperService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const isExpired = this.jwtHelper.isTokenExpired();

    if (!isExpired && this.auth.currentUser['role'] === 'manager' ) {
      return of(true)
    } else {
      return of(false)
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }
}
