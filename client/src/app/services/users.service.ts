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

  addUser(user: any): Observable<any> {
    return this.http.post(this.url, {
      name: user.name,
      email: user.email,
    });
  }

  editUser(user: any): Observable<any> {
    return this.http.put(`${this.url}/${user._id}`, {
      name: 'edited',
      email: 'edited',
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
