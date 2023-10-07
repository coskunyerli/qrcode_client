import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AppSettings } from 'src/app/constants';
@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {

    }

    public getToken(): string {
        return localStorage.getItem('token') || '';
    }
    public isLocalAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return !!token;
    }

    public isAuthenticated(): Observable<boolean> {
        if (!this.isLocalAuthenticated()) {
            return of(false);
        } else {
            let token = this.getToken();
            return this.http.put(`${AppSettings.BASE_URL}/login`, { token: token }).pipe(map((res: any) => {
                return res.has;
            }),
                catchError((error) => {
                    return of(false);
                })
            );
        }
    }

    public loginUser(token: string) {
        localStorage.setItem('token', token);
    }

    public logoutUser(){
        localStorage.removeItem('token');
    }

}