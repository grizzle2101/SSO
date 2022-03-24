import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login, LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public userLogin: Login = { email: '', password: '' };

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.userLogin).subscribe((token) => {
      console.log('token - ', token);

      //todo - navigate externally to redirect URI.
    });
  }
}
