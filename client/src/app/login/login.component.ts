import { Component, OnInit } from '@angular/core';
import { Login, LoginService } from '../services/login.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userLogin: Login = { email: '', password: '' };

  constructor(
    private loginService: LoginService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.userLogin).subscribe((result) => {
      this.routingService.navigateToRedirectPage(result.token);
    });
  }
}
