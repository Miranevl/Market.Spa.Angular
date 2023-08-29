import { Injectable, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    login(loginOrEmail: string, password: string): Observable<any> {
        return this.httpClient.post('/api/Users/Login', { loginOrEmail, password })
    };

    public isAuthenticated() {
        return '';
    }
}
