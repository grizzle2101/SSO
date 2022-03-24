import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  navigateToRedirectPage(token: string) {
    this.router.navigate(['redirect'], {
      queryParams: { token },
    });
  }

  isManagementLogin(): boolean {
    return this.router.url.includes('management');
  }

  getToken(): string {
    return this.route.snapshot.queryParams['token'];
  }
}
