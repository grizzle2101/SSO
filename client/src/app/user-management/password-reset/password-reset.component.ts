import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService, User } from 'src/app/services/users.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  isLoading: boolean = true;
  isManagement: boolean = false;
  user!: User;
  token!: any;

  accountForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
  });

  constructor(
    private routingService: RoutingService,
    public tokenService: TokenService,
    private userService: UsersService,
    private passwordResetService: PasswordResetService
  ) {}

  ngOnInit(): void {
    let rawToken = this.routingService.getToken();
    this.token = this.tokenService.decodeToken(rawToken);

    this.userService.getUser(this.token.user._id).subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  cancel() {
    this.routingService.navigateToLogin(this.isManagement);
    this.tokenService.removeToken();
  }

  updatePassword() {
    let passwordControl = this.accountForm.get('password');

    if (passwordControl?.dirty) {
      this.passwordResetService
        .updatePassword(this.user._id, passwordControl.value)
        .subscribe((updatedUser) => {
          console.log('password updated.');
        });
    }
  }
}
