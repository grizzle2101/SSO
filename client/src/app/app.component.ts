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
}
