import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  navigateToRedirectPage(token: string) {
    this.router.navigate(['redirect'], {
      queryParams: { token },
    });
  }

  getToken(): string {
    return this.route.snapshot.queryParams['token'];
  }
}
