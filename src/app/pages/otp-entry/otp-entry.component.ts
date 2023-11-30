import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../../constants';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-otp-entry',
  templateUrl: './otp-entry.component.html',
  styleUrls: ['./otp-entry.component.css']
})
export class OtpEntryComponent {

  otpValue: string = ''
  contact: string = ''
  buttonIsDirty = false;
  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      if (!data.has('contact')) {
        this.router.navigate(['/login']);
      } else {
        this.contact = data.get('contact') || '';
        this.userService.userHasOTPValue(this.contact).subscribe(result => {
          if (!result) {
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
  onSubmit() {
    this.buttonIsDirty = true;
    if (!this.contact) {
      this.toastService.error('Verify Error', 'There is no contact value to verify.');
    } else {
      let otp = this.otpValue;
      if (otp.length < 6) {
        return;
      }
      this.userService.verifyUser(this.contact, otp).subscribe({
        next: data => {
          this.authService.loginUser(data.token);
          let redirectUrl = localStorage.getItem('redirectUrl');
          if (!!redirectUrl) {
            localStorage.removeItem('redirectUrl');
            this.router.navigateByUrl(redirectUrl);
          }
          else {
            this.router.navigate([AppSettings.ACCOUNT_PATH]);
          }
        },
        error: error => {
          this.toastService.error('Verify Error', 'Verifying is not done successfully.');
          console.error(otp, this.contact, error);
        }
      });
    }



  }
}
