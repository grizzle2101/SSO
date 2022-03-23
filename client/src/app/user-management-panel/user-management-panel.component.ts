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

  constructor(private usersServive: UsersService, private dialog: MatDialog) {
    this.usersServive.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser() {
    const dialog = this.openDialog();

    dialog.afterClosed().subscribe((updatedUser) => {
      if (updatedUser)
        this.usersServive.addUser(updatedUser).subscribe((addedUser) => {
          this.users.push(addedUser);
        });
    });
  }

  editUser(user: any) {
    const dialog = this.openDialog(user);
    dialog.afterClosed().subscribe((updatedUser) => {
      if (updatedUser)
        this.usersServive.editUser(updatedUser).subscribe((editedUser) => {
          user.name = editedUser.name;
          user.email = editedUser.email;
        });
    });
  }

  deleteUser(user: any) {
    this.usersServive.deleteUser(user._id).subscribe((deletedUser) => {
      this.users = this.users.filter((user) => user._id !== deletedUser._id);
    });
  }

  openDialog(user: any = {}) {
    return this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: { _id: user._id, name: user.name, email: user.email },
    });
  }
}
