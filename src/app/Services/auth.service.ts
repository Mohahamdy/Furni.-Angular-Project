import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();

    if (!token) return false;

    const decoded = jwtDecode(token);

    const isTokenExpired = Date.now() > decoded['exp']! * 1000;
    if (isTokenExpired) this.logOut();
    return !isTokenExpired;
  }

  logOut() {
    localStorage.removeItem('token');
  }

  getToken = (): string | null => localStorage.getItem('token') || '';

  isAdmin(): boolean {
    if (!this.isTokenExpired()) return false;

    const token: any = this.getToken();

    const decoded: any = jwtDecode(token);
    const isAdmin =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ==
      'Admin';

    return isAdmin;
  }

  getUserName(): string | null {
    if (this.isLoggedIn()) {
      const token: any = this.getToken();

      const decoded: any = jwtDecode(token);
      return decoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    }

    return null;
  }
}
