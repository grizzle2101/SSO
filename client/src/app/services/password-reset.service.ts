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

  private passwordResetUrl = environment.apiEndpoint + '/password-reset';
  private passwordChangeUrl =
    environment.apiEndpoint + '/password-reset/complete-change';

  emailPasswordReset(_id: any): Observable<any> {
    return this.http.post(this.passwordResetUrl, { _id });
  }

  updatePassword(_id: any, password: string): Observable<any> {
    return this.http.post(this.passwordChangeUrl, {
      _id,
      password,
    });
  }
}
