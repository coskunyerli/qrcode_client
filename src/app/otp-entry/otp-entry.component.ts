import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../constants';

@Component({
  selector: 'app-otp-entry',
  templateUrl: './otp-entry.component.html',
  styleUrls: ['./otp-entry.component.css']
})
export class OtpEntryComponent {

  otpValue: string = '';
  contact: string | null = ''
  constructor(private http: HttpClient, private authService: AuthService, public route: ActivatedRoute, private router: Router) {
    route.data.subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.contact = data.get('contact');
    });
  }
  onSubmit() {
    if (!this.authService.isAuthenticated()) {
      if (!this.contact) {
        //this.router.navigate(['no_page'])
        // show no page
      } else {
        this.http.post<any>(`${AppSettings.BASE_URL}/login/verify`, { contact: this.contact, otp: this.otpValue }).subscribe({
          next: data => {
            this.authService.loginUser(data.token);
            let redirectUrl = localStorage.getItem('redirectUrl');
            if (!!redirectUrl) {
              this.router.navigate([redirectUrl]);
            }
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
      }

    }

  }
}
