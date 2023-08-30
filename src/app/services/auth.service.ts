import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    login(loginOrEmail: string, password: string): Observable<any> {
        return this.httpClient.post('/api/Users/Login', { loginOrEmail, password });
    };

    registration(login: string, password: string, email: string): Observable<any> {
        return this.httpClient.post('/api/Users/Create', { login, password, email });
    }

    auth(refreshToken: string): Observable<any> {
        return this.httpClient.get(`/api/Users/LoginByRefreshToken?refreshToken=${refreshToken}`)
    }

    public isAuthenticated(): Observable<boolean> {
        const token = window.localStorage.getItem('token');
        if (token) {
            return of(true);
        } else {
            return of(false);
        }
    }
}
