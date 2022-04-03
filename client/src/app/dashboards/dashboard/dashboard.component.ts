import { Component, OnInit } from '@angular/core';
import { LogEntry, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  logins: any[] = [];

  constructor(private loginService: LoginService) {
    loginService.getLogins().subscribe((logins) => {
      this.logins = logins;
    });
  }
}
