import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  navigateToLink(link: string) {
    this.router.navigateByUrl(link);
  }

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  navigateToLogin() {
    this.router.navigateByUrl('management/login');
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
