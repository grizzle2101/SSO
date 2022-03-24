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
    //todo - create seperate process for admin/management users.
    if (this.isManagementLogin)
      this.loginService.login(this.userLogin).subscribe((result) => {
        this.routingService.navigateToHome();
      });
    else
      this.loginService.login(this.userLogin).subscribe((result) => {
        this.routingService.navigateToRedirectPage(result.token);
      });
  }
}
