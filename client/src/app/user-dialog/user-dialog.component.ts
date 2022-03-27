import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    this.data.isManagement = toggle;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface UserDialogData {
  _id: string;
  name: string;
  email: string;
  password: string;
  isManagement: boolean;
  editMode: boolean;
}
