import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  tokenId!: string;

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
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    /* Todo
    -get reset id from url
    -query DB for RESET colleciton, make sure its valid
    -then allow modification of password
    -send updated password & RESET collection to backend.
    -close page, make sure cannot be reloaded. (replace with banner saying success, or expired if they reload.)
     */

    this.tokenId = this.routingService.getToken();
    this.isLoading = false;
  }

  cancel() {
    this.routingService.navigateToLogin(this.isManagement);
    this.tokenService.removeToken();
  }

  createOrUpdate() {
    let passwordControl = this.accountForm.get('password');

    if (passwordControl?.dirty) {
      this.userService
        .editUser(this.tokenId, { password: passwordControl.value })
        .subscribe((updatedUser) => {
          this.populateForm(updatedUser);
        });
    }
  }

  private populateForm(user: User) {
    this.accountForm.patchValue({
      password: user.password,
    });
  }
}
