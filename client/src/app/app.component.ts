import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenHelper } from './helpers/tokenHelper';
import { TokenService } from './services/token.service';
import { RoutingService } from './services/routing.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  @ViewChild('sidenav') sidenav!: MatSidenav;

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

  closeSidenav(): void {
    this.sidenav.close();
  }

  logout() {
    this.closeSidenav();
    this.tokenService.removeToken();
    this.routingService.navigateToLogin();
  }
}

export interface Link {
  icon: string;
  displayName: string;
  link: string;
}
