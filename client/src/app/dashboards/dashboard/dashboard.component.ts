import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  DashboardService,
  DashboardTotals,
} from 'src/app/services/dashboard.service';
import { LogEntry, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  logins: LogEntry[] = [];
  dashboardTotals: any;
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private dashboardService: DashboardService
  ) {
    forkJoin({
      dashboardTotals: this.dashboardService.getDashboardTotals(),
      logins: this.loginService.getLogins(),
    }).subscribe((mergedData) => {
      this.logins = this.sortByDate(mergedData.logins);
      this.dashboardTotals = mergedData.dashboardTotals;
      this.isLoading = false;
    });
  }

  calculatePercentage(dashboardTotals: DashboardTotals) {
    return Math.round(
      (this.dashboardTotals.totalFailures /
        this.dashboardTotals.totalTokensIssued) *
        100
    );
  }

  private sortByDate(logins: LogEntry[]): LogEntry[] {
    return logins.sort((a: LogEntry, b: LogEntry) => {
      return +new Date(b.timeStamp) - +new Date(a.timeStamp);
    });
  }
}
