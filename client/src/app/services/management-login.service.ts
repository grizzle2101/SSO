import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementLoginService extends LoginService {
  constructor(_http: HttpClient) {
    super(_http);
    this.url = environment.apiEndpoint + '/management/login';
  }

  override login(userLogin: Login): Observable<any> {
    return this.http.post(this.url, userLogin);
  }

  override getLogins(): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(this.url);
  }
}

export interface Login {
  email: string;
  password: string;
}

export interface LogEntry {
  _id: string;
  user: {
    email: string;
  };
  timeStamp: Date;
  origin: string;
}
