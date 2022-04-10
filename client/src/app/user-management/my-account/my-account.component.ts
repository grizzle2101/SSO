import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { User, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  isEdit: boolean = false;
  isLoading: boolean = true;

  accountForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
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
    this.isEdit = this.routingService.searchUrl('edit');

    if (this.isEdit) {
      this.userService
        .getUser(this.tokenService.token.user._id)
        .subscribe((user) => {
          this.populateForm(user);
          this.isLoading = false;
        });
    } else this.isLoading = false;
  }

  cancel() {
    this.routingService.navigateToLogin();
  }

  createOrUpdate() {
    let id = this.tokenService.token.user._id;
    let formData = this.accountForm.getRawValue();
    let passwordControl = this.accountForm.get('password');

    let user: User = { email: formData.email, name: formData.name };

    //DO NOT send already hashed password
    if (passwordControl?.dirty) {
      user.password = passwordControl.value;
    }

    if (this.isEdit) {
      this.userService.editUser(id, user).subscribe((updatedUser) => {
        this.populateForm(updatedUser);
      });
    } else {
      this.userService.addUser(user).subscribe((updatedUser) => {
        this.populateForm(updatedUser);
      });
    }
  }

  private populateForm(user: User) {
    this.accountForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
