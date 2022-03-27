import { Component } from '@angular/core';
import { TokenHelper } from './helpers/tokenHelper';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(
    private routingService: RoutingService,
    private tokenHelper: TokenHelper
  ) {}

  sideNavLinks: Link[] = [
    { icon: 'dashboard', displayName: 'Dashboard', link: '/' },
    {
      icon: 'manage_accounts',
      displayName: 'User Management',
      link: 'user-management',
    },
  ];

  navigate(link: string) {
    this.routingService.navigateToLink(link);
  }

  logout() {
    this.tokenHelper.removeToken();
    this.routingService.navigateToLogin();
  }
}

export interface Link {
  icon: string;
  displayName: string;
  link: string;
}
