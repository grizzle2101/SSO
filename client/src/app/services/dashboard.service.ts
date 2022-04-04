import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  private url = environment.apiEndpoint + '/dashboard';

  getLogins(): Observable<DashboardTotals[]> {
    return this.http.get<DashboardTotals[]>(this.url);
  }
}

export interface DashboardTotals {
  totalUsers: number;
  totalTokensIssued: number;
}
