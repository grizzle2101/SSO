import jwt_decode from 'jwt-decode';

export class TokenHelper{
    
    getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}