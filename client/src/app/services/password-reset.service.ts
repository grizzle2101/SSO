import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  constructor(private http: HttpClient) {}

  private url = environment.apiEndpoint + '/password-reset';

  resetOwnPassword(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  managementResetPassword(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }
}
