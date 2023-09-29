import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppSettings } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  contact: string = ''
  otpValue: string = ''

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.authService.isAuthenticated()) {
      this.http.post<any>(`${AppSettings.BASE_URL}/login`, { contact: this.contact }).subscribe({
        next: data => {
          //this.otpValue = data.otp;
          this.router.navigate(['otp'], { queryParams: { contact: this.contact } })
          console.log(data);
        },
        error: error => {
          console.error('There was an error!', error);
          //this.otpValue = '';
        }
      });
    } else {

    }
  }

  hasOtpValue(): boolean {
    return !!this.otpValue;
  }
}
