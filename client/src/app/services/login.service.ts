import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private url = environment.apiEndpoint + '/login';

  login(userLogin: Login): Observable<any> {
    return this.http.post(this.url, userLogin);
  }

  getLogins(): Observable<any> {
    return this.http.get(this.url);
  }
}

export interface Login {
  email: string;
  password: string;
}

export interface LogEntry {
  _id: string;
  email: string;
  timeStamp: Date;
  origin: string;
}
