import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementGuard implements CanActivate {
  constructor(private routingService: RoutingService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var token = localStorage.getItem('token');
    const isManagement = this.getDecodedAccessToken(token)?.user.isManagement;

    if (!isManagement) this.routingService.navigateToLogin();

    return isManagement;
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
