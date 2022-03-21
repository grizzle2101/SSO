import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/users';

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }
}
