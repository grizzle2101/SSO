import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private url = environment.apiEndpoint + '/login';

  login(userLogin: Login): Observable<any> {
    return this.http.post(this.url, userLogin);
  }
}

export interface Login {
  email: string;
  password: string;
}
