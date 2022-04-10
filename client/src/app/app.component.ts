import { Component, OnInit } from '@angular/core';
import { TokenHelper } from './helpers/tokenHelper';
import { TokenService } from './services/token.service';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private routingService: RoutingService,
    public tokenService: TokenService
  ) {}
  ngOnInit(): void {}

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
    this.tokenService.removeToken();
    this.routingService.navigateToLogin();
  }
}

export interface Link {
  icon: string;
  displayName: string;
  link: string;
}
