import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
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

  createOrEditAccount(login: ActionButton) {
    login.action === 'create'
      ? this.routingService.navigateToAccountPage(login.link) //no login needed
      : this.requestLogin(login);
  }

  login(isExternal: boolean = false) {
    this.requestLogin(defaultButton, isExternal);
  }

  private requestLogin(login: ActionButton, isExternal: boolean = false) {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (result) => {
        let token = this.tokenService.decodeToken(result.token);

        if (this.isManagementLogin && !token.user.isManagement) {
          this.errorText = 'User is not a management user';
          return;
        }

        if (isExternal) {
          this.routingService.navigateToRedirectPage('sample-token');
          return;
        }

        this.tokenService.storeToken(result.token);

        login.action === 'login'
          ? this.routingService.navigateToHome()
          : this.routingService.navigateToLink(login.link);
      },
      error: ({ error }) => (this.errorText = error),
    });
  }

  private createButton(
    isCreate: boolean = false,
    isManagement: boolean = false
  ) {
    let button: ActionButton = {
      text: isCreate ? 'Dont have an account?' : 'Update your Details?',
      button: isCreate ? 'Create one' : 'Edit',
      link: isCreate ? 'create-my-account' : 'edit-my-account',
      action: isCreate ? 'create' : 'edit',
    };

    button.link = (isManagement ? 'management/' : 'public/') + button.link;
    if (isManagement && isCreate) button.button = 'Apply';

    return button;
  }
}

export interface ActionButton {
  text?: string;
  button?: string;
  link: string;
  action: string;
}

export const defaultButton: ActionButton = {
  action: 'login',
  link: 'default-link',
};
