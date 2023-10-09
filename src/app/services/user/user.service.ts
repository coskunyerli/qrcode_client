import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AppSettings } from 'src/app/constants';
import { LoginUserResponseInterface, VerifyUserResponseInterface } from 'src/app/interfaces/loginUserResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(contact: string): Observable<LoginUserResponseInterface> {
    return this.http.post<LoginUserResponseInterface>(`${AppSettings.BASE_URL}/login`, { contact: contact });
  }

  verifyUser(contact: string, otp: string): Observable<VerifyUserResponseInterface> {
    return this.http.post<VerifyUserResponseInterface>(`${AppSettings.BASE_URL}/login/verify`, {
      contact: contact,
      otp: otp
    });
  }

  userHasOTPValue(contact: string): Observable<boolean> {
    return this.http.put(`${AppSettings.BASE_URL}/login/verify`, { contact: contact }).pipe(map((res: any) => {
      return res.has;
    }),
      catchError((error) => {
        return of(false);
      })
    );
  }
}
