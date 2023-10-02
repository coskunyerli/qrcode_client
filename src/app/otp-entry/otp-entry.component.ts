import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../constants';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-otp-entry',
  templateUrl: './otp-entry.component.html',
  styleUrls: ['./otp-entry.component.css']
})
export class OtpEntryComponent {

  otpValue1: string = '';
  otpValue2: string = '';
  otpValue3: string = '';
  otpValue4: string = '';
  otpValue5: string = '';
  otpValue6: string = '';
  contact: string | null = ''
  constructor(
    private authService: AuthService,
    public route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    route.data.subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.contact = data.get('contact');
    });
  }
  onSubmit() {
    if (!this.authService.isLocalAuthenticated()) {
      if (!this.contact) {
        //this.router.navigate(['no_page'])
        // show no page
      } else {
        let otp = this.otpValue1 + this.otpValue2 + this.otpValue3 + this.otpValue4 + this.otpValue5 + this.otpValue6;
        this.userService.verifyUser(this.contact, otp).subscribe({

          next: data => {
            this.authService.loginUser(data.token);
            let redirectUrl = localStorage.getItem('redirectUrl');
            if (!!redirectUrl) {
              this.router.navigate([redirectUrl]);
            }
            else {
              this.router.navigate(['/my_account'])
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
