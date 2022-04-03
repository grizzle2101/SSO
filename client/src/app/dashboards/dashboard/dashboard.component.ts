import { Component, OnInit } from '@angular/core';
import { LogEntry, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  logins: LogEntry[] = [];

  constructor(private loginService: LoginService) {
    loginService
      .getLogins()
      .subscribe((logins) => (this.logins = this.sortByDate(logins)));
  }

  private sortByDate(logins: LogEntry[]): LogEntry[] {
    return logins.sort((a: LogEntry, b: LogEntry) => {
      return +new Date(b.timeStamp) - +new Date(a.timeStamp);
    });
  }
}
