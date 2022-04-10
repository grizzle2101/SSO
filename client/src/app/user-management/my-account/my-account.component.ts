import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  isEdit: boolean = false;
  isLoading: boolean = true;

  constructor(
    private routingService: RoutingService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.routingService.searchUrl('edit');

    if (this.isEdit) {
      //use token to load a user...
      //pt only navigate on successful authentiction
    }
  }
}
