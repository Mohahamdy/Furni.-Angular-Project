import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseURL: string = 'http://localhost:8066/api/Account';
  constructor(private httpClient: HttpClient) {}

  login(email: string | null, password: string | null): Observable<any> {
    return this.httpClient.get(
      `${this.baseURL}?Email=${email}&Password=${password}`
    );
  }
}
