import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-redirect',
  template: 'redirecting...',
})
export class RedirectComponent implements OnInit {
  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    const token = this.routingService.getToken();
    window.location.href = 'http://www.localhost.com/' + token;
  }
}
