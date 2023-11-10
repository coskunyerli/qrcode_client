import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings } from '../constants';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../services/qr/qr.service';
import { FoundPersonOTPResponseInterface, User } from '../interfaces/userInfoInterface';
import { UserShowType } from "../interfaces/userInfoInterface";
import { QRUserRelationDetailResponseInterface } from '../interfaces/qrUserRelationResponseInterface';

@Component({
  selector: 'app-qr-founder-page',
  templateUrl: './qr-founder-page.component.html',
  styleUrls: ['./qr-founder-page.component.css']
})
export class QRFounderPageComponent {
  userShowType = UserShowType
  data: QRUserRelationDetailResponseInterface | null = null;
  founder: FoundPersonOTPResponseInterface | null = null;
  constructor(
    private router: Router, private route: ActivatedRoute, private qrService: QrService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      let id: number = Number(params.get('id')) || -1;
      if (id > -1) {
        this.qrService.getUserQRRelationDetail(id).subscribe({
          next: data => {
            this.data = data;
          }, error: error => {
            console.log(`Unexpected error exists Error is ${error}`)
          }
        })
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  sendFounderInfo(contact: string, message: string) {
    if (!this.data) {
      return;
    }
    if (contact) {
      this.qrService.createFoundQrRelation(this.data.id, message, contact).subscribe({
        next: data => {
          if (data.founderID && data.isNotificationsSent) {
            console.log(data);
            this.founder = data;
          }
        },
        error: error => {
          console.log(error);
        }
      })
    } else {

    }
  }
  verifyOTP(otp: string) {
    if (this.founder && this.founder.founderID !== null && !!this.data) {
      this.qrService.confirmFoundPersonOTP(this.founder.founderID || -1, otp, this.data.id, location.origin + '/my_account?qrCode=' + this.data.qrCode).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      })
    }

  }
}
