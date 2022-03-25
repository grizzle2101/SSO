import { Component, OnInit } from '@angular/core';
import { Login, LoginService } from '../services/login.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isManagementLogin: boolean = false;
  public userLogin: Login = { email: '', password: '' };

  constructor(
    private loginService: LoginService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.isManagementLogin = this.routingService.isManagementLogin();
  }

  login() {
    if (this.isManagementLogin)
      this.loginService.login(this.userLogin).subscribe({
        next: (result) => {
          this.storeToken(result.token);
          this.routingService.navigateToHome();
        },
        error: () => alert("Unfortunately we could not find your account")
      });
    else
      this.loginService.login(this.userLogin).subscribe({
        next: (result) => {
          this.routingService.navigateToRedirectPage(result.token);
        },
        error: () => alert("Unfortunately we could not find your account")
      });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
}
