import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppSettings } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.scss', '../../styles.css']
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
          const contactName = this.contact;
          console.error(`Could not find an account related to ${contactName}`, error);
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
