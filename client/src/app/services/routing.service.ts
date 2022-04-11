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

  navigateToLogin(isManagement: boolean = true) {
    let loginUrl = isManagement ? 'management/login' : 'public/login';
    this.router.navigateByUrl(loginUrl);
  }

  navigateToAccountPage(link: string) {
    this.router.navigateByUrl(link);
  }

  navigateToRedirectPage(token: string) {
    this.router.navigate(['redirect'], {
      queryParams: { token },
    });
  }

  isManagementLogin(): boolean {
    return this.router.url.includes('management');
  }

  searchUrl(searchTerm: string): boolean {
    return this.router.url.includes(searchTerm);
  }

  getToken(): string {
    return this.route.snapshot.queryParams['token'];
  }
}
