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
  errorText: String = "";
  public userLogin: Login = { email: '', password: '' };

  constructor(
    private loginService: LoginService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.isManagementLogin = this.routingService.isManagementLogin();
  }

  login() {
    this.errorText = ""

    if (this.isManagementLogin)
      this.loginService.login(this.userLogin).subscribe({
        next: (result) => {
          this.storeToken(result.token);
          this.routingService.navigateToHome();
        },
        error: (e) => {
          this.errorText = e.error;
        }
      });
    else
      this.loginService.login(this.userLogin).subscribe({
        next: (result) => {
          this.routingService.navigateToRedirectPage(result.token);
        },
        error: (e) => {
          this.errorText = e.error;
        }
      });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
}
