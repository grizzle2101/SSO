import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  users: any[] = [];

  constructor(private usersServive: UsersService) {
    this.usersServive.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser() {
    const user = { name: 'new user', email: 'new email' };
    this.usersServive.addUser(user).subscribe((addedUser) => {
      this.users.push(addedUser);
    });
  }

  editUser(user: any) {
    this.usersServive.editUser(user).subscribe((editedUser) => {
      user.name = editedUser.name;
      user.email = editedUser.email;
    });
  }

  deleteUser(user: any) {
    this.usersServive.deleteUser(user._id).subscribe((deletedUser) => {
      this.users = this.users.filter((user) => user._id !== deletedUser._id);
    });
  }
}
