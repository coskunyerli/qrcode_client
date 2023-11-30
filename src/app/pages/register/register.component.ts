import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckQRResponseInterface } from '../../interfaces/checkQRResponseInterface';
import { AppSettings } from '../../constants';
import { QRUserRelationDetailResponseInterface } from '../../interfaces/qrUserRelationResponseInterface';
import { QrService } from '../../services/qr/qr.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  qrID: string = '';
  message: string = '';
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private qrService: QrService,
    private authService: AuthService) {

  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.qrID = data.get('qr') || '';
      if (!this.qrID) {
        this.router.navigate([AppSettings.ACCOUNT_PATH]);
      } else {
        this.qrService.checkQRExist(this.qrID).subscribe({
          next: data => {
            if (!data.has) {
              this.router.navigate([AppSettings.ACCOUNT_PATH]);
            } else {
              this.qrService.checkUserQRRelation(this.qrID).subscribe({
                next: data => {
                  if (data.has) {
                    this.router.navigate([AppSettings.ACCOUNT_PATH]);
                  } else if (localStorage.getItem('registerState') === 'continue') {
                    // after login update register operation
                    localStorage.removeItem('registerState');
                    this.registerQR();
                  }
                },
                error: error => {
                  this.toastService.error('QR Error', 'There is an error checking QR')
                  console.error(this.qrID, error);
                }
              })
            }
          },
          error: error => {
            this.toastService.error('QR Error', 'There is an error while checking QR existence');
            console.error(this.qrID, error);
          }
        });
      }

    });
  }
  registerQR() {
    if (!this.qrID) {
      return;
    }
    this.authService.isAuthenticated().subscribe({
      next: result => {
        if (!result) {
          localStorage.setItem('redirectUrl', this.router.url);
          localStorage.setItem('registerState', 'continue');
          this.router.navigate(['/login'])
        } else {
          this.qrService.createUserQRRelation(this.qrID, this.message).subscribe({
            next: result => {
              if (result) {
                this.toastService.success('Register', 'QR is registered successfully');
                this.router.navigate([AppSettings.ACCOUNT_PATH]);
              }
            }
          });
        }
      }, error: error => {
        this.toastService.error('Authentication Error', 'There is an authentication error.');
        console.log(`There is an authentication error while registering QR. ID is ${this.qrID}. Error is ${error}`);
      }
    })
  }
}
