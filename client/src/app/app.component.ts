import { Component } from '@angular/core';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(private routingService: RoutingService) {}

  checkLogin() {
    if (localStorage.getItem('token')) return true;
    return false;
  }
  logOut() {
    localStorage.clear();
    this.routingService.navigateToLogin();
  }
}
