import { Injectable, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient)
  {
    this.loginCounter = parseInt(sessionStorage.getItem('auth') as string) || 0;
  }

  loginCounter = 0;

  public login(login: string, password: string): Observable<any[]> {
    this.loginCounter++;
    sessionStorage.setItem('auth', this.loginCounter.toString());
    return of([true, this.loginCounter]);
  }

  public isAuthenticated() {
    return this.loginCounter > 0;
  }
}
