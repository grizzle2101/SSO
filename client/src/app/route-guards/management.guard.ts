import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingService } from '../services/routing.service';
import { TokenHelper } from '../helpers/tokenHelper';

@Injectable({
  providedIn: 'root',
})
export class ManagementGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private tokenHelper: TokenHelper
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var token = this.tokenHelper.getToken();
    const isManagement =
      this.tokenHelper.getDecodedToken(token)?.user.isManagement;

    if (!isManagement) {
      this.tokenHelper.removeToken();
      this.routingService.navigateToLogin();
    }
    return isManagement;
  }
}
