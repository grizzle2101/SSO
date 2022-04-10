import { Component, OnInit } from '@angular/core';
import { TokenHelper } from './helpers/tokenHelper';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  token: any;

  constructor(
    private routingService: RoutingService,
    private tokenHelper: TokenHelper
  ) {}
  ngOnInit(): void {
    this.token = this.tokenHelper.getDecodedToken(this.tokenHelper.getToken());
  }

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
    this.token = null;
    this.routingService.navigateToLogin();
  }
}

export interface Link {
  icon: string;
  displayName: string;
  link: string;
}
