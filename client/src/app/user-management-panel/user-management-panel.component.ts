import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-management-panel',
  templateUrl: './user-management-panel.component.html',
  styleUrls: ['./user-management-panel.component.css'],
})
export class UserManagementPanelComponent {
  users: any[] = [];
  errorText: String = ""

  constructor(private usersServive: UsersService, private dialog: MatDialog) {
    this.usersServive.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser() {
    this.errorText = "";
    const dialog = this.openDialog();
    dialog.afterClosed().subscribe((updatedUser) => {
      if (updatedUser)
          this.usersServive.addUser(updatedUser).subscribe({
            next: (addedUser) => {
              this.users.push(addedUser);
            },
            error: (e) => {this.errorText = e.error} 
          });
      });
  }

  editUser(user: any) {
    this.errorText = "";
    const dialog = this.openDialog(user, true);
    dialog.afterClosed().subscribe((updatedUser) => {
        if (updatedUser)
          this.usersServive.editUser(updatedUser).subscribe({
            next: (editedUser) => {
              user.name = editedUser.name;
              user.email = editedUser.email;
              user.isManagement = editedUser.isManagement;
            },
            error: (e) => {this.errorText=e.error}
          });
      });
  }

  resetPassword(user: any) {
    user.password = '';
    this.usersServive.editUser(user).subscribe((editedUser) => {
      user.password = editedUser.password;
    });
  }

  deleteUser(user: any) {
    this.usersServive.deleteUser(user._id).subscribe((deletedUser) => {
      this.users = this.users.filter((user) => user._id !== deletedUser._id);
    });
  }

  openDialog(user: any = {}, editMode: boolean = false) {
    return this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isManagement: user.isManagement,
        editMode,
      },
    });
  }
}
