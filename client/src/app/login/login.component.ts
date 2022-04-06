import { Component, OnInit } from '@angular/core';
import { TokenHelper } from '../helpers/tokenHelper';
import { Login, LoginService } from '../services/login.service';
import { ManagementLoginService } from '../services/management-login.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isManagementLogin: boolean = false;
  errorText: String = '';
  public userLogin: Login = { email: '', password: '' };

  constructor(
    private loginService: LoginService,
    private managementLoginService: ManagementLoginService,
    private routingService: RoutingService,
    private tokenHelper: TokenHelper
  ) {}

  ngOnInit(): void {
    this.isManagementLogin = this.routingService.isManagementLogin();
  }

  login() {
    this.errorText = '';

    if (this.isManagementLogin)
      this.managementLoginService.login(this.userLogin).subscribe({
        next: (result) => {
          this.tokenHelper.storeToken(result.token);
          this.routingService.navigateToHome();
        },
        error: (e) => {
          this.errorText = e.error;
        },
      });
    else
      this.loginService.login(this.userLogin).subscribe({
        next: (result) => {
          this.routingService.navigateToRedirectPage(result.token);
        },
        error: (e) => {
          this.errorText = e.error;
        },
      });
  }
}
