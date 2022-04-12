import { Component, OnInit } from '@angular/core';
import { Login, LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { RoutingService } from '../services/routing.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isManagementLogin: boolean = false;
  loginDetails!: ActionButton;
  errorText!: String;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private routingService: RoutingService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.isManagementLogin = this.routingService.isManagementLogin();

    this.loginDetails = this.createButton(true, this.isManagementLogin);

    this.loginForm.valueChanges.subscribe((form) => {
      if (form.email && form.password) {
        this.loginDetails = this.createButton(false, this.isManagementLogin);
      }
    });
  }

  createButton(isCreate: boolean = false, isManagement: boolean = false) {
    let button: ActionButton = {
      text: isCreate ? 'Dont have an account?' : 'Update your Details?',
      button: isCreate ? 'Create one' : 'Edit',
      link: isCreate ? 'create-my-account' : 'edit-my-account',
      action: isCreate ? 'create' : 'edit',
    };

    if (isManagement && isCreate) {
      button.button = 'Apply';
    }
    return button;
  }

  login(isStandardLogin: any = true) {
    this.errorText = '';

    if (this.isManagementLogin || isStandardLogin === false) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (result) => this.handleSuccessResponse(result, isStandardLogin),
        error: ({ error }) => (this.errorText = error),
      });
    } else {
      this.routingService.navigateToRedirectPage('sample-token');
    }
  }

  createOrEditAccount(navItem: any) {
    if (navItem.button === 'Edit') {
      this.login(false);
    } else this.routingService.navigateToAccountPage(navItem.link);
  }

  private async handleSuccessResponse(
    result: any,
    isStandardLogin: boolean = true
  ) {
    let token = this.tokenService.decodeToken(result.token);
    if (this.isManagementLogin && isStandardLogin && !token.user.isManagement) {
      this.errorText = 'User is not a management user';
    } else {
      await this.tokenService.storeToken(result.token);

      isStandardLogin
        ? this.routingService.navigateToHome()
        : this.routingService.navigateToAccountPage('edit-my-account');
    }
  }
}

export interface ActionButton {
  text: string;
  button: string;
  link: string;
  action: string;
}
