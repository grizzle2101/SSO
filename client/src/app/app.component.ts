import { Component } from '@angular/core';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(private routingService: RoutingService) {}

  sideNavLinks: Link[] = [
    { icon: 'dashboard', displayName: 'Dashboard', link: 'dashboards' },
    {
      icon: 'manage_accounts',
      displayName: 'User Management',
      link: 'user-management',
    },
  ];

  navigate(link: string) {
    this.routingService.navigateToLink(link);
  }

  logout() {}
}

export interface Link {
  icon: string;
  displayName: string;
  link: string;
}
