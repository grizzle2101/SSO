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
  getUser(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.url, user);
  }

  editUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}

export interface User {
  name: string;
  email: string;
  password?: string;
  isManagement: boolean;
}
