import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorStateMatcherModule } from '../helpers/dialogErrorStateMatcherModule';
import { User } from '../services/users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {}

  setIsManagement(toggle: boolean) {
    this.data.user.isManagement = toggle;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  nameFormControls = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(255),
  ]);
  emailFormControls = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(320),
    Validators.email,
  ]);
  passwordFormControls = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(255),
  ]);
  matcher = new DialogErrorStateMatcherModule();
}

export interface UserDialogData {
  _id: string;
  user: User;
  editMode: boolean;
}
