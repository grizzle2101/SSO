import { Component, OnInit } from '@angular/core';
import { Login, LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
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
    private routingService: RoutingService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.isManagementLogin = this.routingService.isManagementLogin();
  }

  login() {
    this.errorText = '';

    this.loginService.login(this.userLogin).subscribe({
      next: (result) => this.handleSuccessResponse(result),
      error: ({ error }) => (this.errorText = error),
    });
  }

  createAccount() {
    console.log('clicked!');
  }

  private handleSuccessResponse(result: any) {
    let token = this.tokenService.decodeToken(result.token);
    if (!token.user.isManagement && this.isManagementLogin) {
      this.errorText = 'User is not a management user';
    } else {
      this.tokenService.storeToken(result.token);
      this.routingService.navigateToHome();
    }
  }
}
