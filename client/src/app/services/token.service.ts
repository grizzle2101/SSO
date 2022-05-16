import { Injectable } from '@angular/core';
import { TokenHelper } from '../helpers/tokenHelper';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isManagement = false;
  token: any;

  constructor(private tokenHelper: TokenHelper) {
    this.loadToken();
  }

  storeToken(token: any) {
    this.tokenHelper.storeToken(token);
    this.token = this.tokenHelper.getDecodedToken(token);
    this.isManagement = this.token?.user?.isManagement;
  }

  getRawToken() {
    return this.tokenHelper.getToken();
  }

  loadToken() {
    let token = this.tokenHelper.getToken();
    this.token = this.tokenHelper.getDecodedToken(token);
    this.isManagement = this.token?.user?.isManagement;
  }
  removeToken() {
    this.tokenHelper.removeToken();
    this.isManagement = false;
    this.token = null;
  }

  decodeToken(token: any) {
    return this.tokenHelper.getDecodedToken(token);
  }
}
