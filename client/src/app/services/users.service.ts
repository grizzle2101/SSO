import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private url = environment.apiEndpoint + '/users';

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }
}
