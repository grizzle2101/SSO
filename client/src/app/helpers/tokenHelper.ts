import jwt_decode from 'jwt-decode';

export class TokenHelper {
  getToken() {
    localStorage.getItem('token');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
