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
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private tokenHelper: TokenHelper,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isManagement = this.tokenService.token?.user.isManagement;

    if (!isManagement) {
      console.error('Non management user attempting login...');
      this.tokenHelper.removeToken();
      this.routingService.navigateToLogin();
    }
    return isManagement;
  }
}
