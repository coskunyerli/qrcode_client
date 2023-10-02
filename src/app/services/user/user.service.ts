import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
