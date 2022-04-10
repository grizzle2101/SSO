import { Injectable } from '@angular/core';
import { TokenHelper } from '../helpers/tokenHelper';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthenticated = false;
  token: any;

  constructor(private tokenHelper: TokenHelper) {
    this.loadToken();
  }

  storeToken(token: any) {
    this.tokenHelper.storeToken(token);
    this.token = this.tokenHelper.getDecodedToken(token);
  }

  loadToken() {
    let token = this.tokenHelper.getToken();
    this.token = this.tokenHelper.getDecodedToken(token);
  }
  removeToken() {
    this.tokenHelper.removeToken();
    this.token = null;
  }

  decodeToken(token: any) {
    return this.tokenHelper.getDecodedToken(token);
  }
}
