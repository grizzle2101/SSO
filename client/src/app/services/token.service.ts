import { Injectable, OnInit } from '@angular/core';
import { TokenHelper } from '../helpers/tokenHelper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthenticated = false;
  token: any;

  constructor(private tokenHelper: TokenHelper) {}

  storeToken(token: any) {
    this.token = this.tokenHelper.getDecodedToken(token);
    this.tokenHelper.storeToken(token);
  }

  getToken() {
    if (this.token === undefined) {
      let token = this.tokenHelper.getToken();
      this.token = this.tokenHelper.getDecodedToken(token);
    }
    return this.token;
  }

  decodeToken(token: any) {
    return this.tokenHelper.getDecodedToken(token);
  }
}
