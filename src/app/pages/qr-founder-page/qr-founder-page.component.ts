import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../../services/qr/qr.service';
import { FoundPersonOTPResponseInterface, User } from '../../interfaces/userInfoInterface';
import { UserShowType } from "../../interfaces/userInfoInterface";
import { QRUserRelationDetailResponseInterface } from '../../interfaces/qrUserRelationResponseInterface';
import { ToastService } from '../../services/toast/toast.service';
import { AppSettings } from 'src/app/constants';

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
    private toastService: ToastService,
    private router: Router, private route: ActivatedRoute, private qrService: QrService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      let id: number = Number(params.get('id')) || -1;
      if (id > -1) {
        this.qrService.getUserQRRelationDetail(id).subscribe({
          next: data => {
            console.log(data);
            this.data = data;
          }, error: error => {
            this.toastService.error('QR Error', 'QR Detail is not get successfully');
            console.error(id, error)
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
    this.qrService.createFoundQrRelation(this.data.id, message, contact).subscribe({
      next: data => {
        if (data.isNotificationsSent && !data.founderID) {
          this.toastService.success('Message Info', 'Message is sent successfully to the owner');
        }
        else if (data.founderID && data.isNotificationsSent) {
          this.founder = data;
        }
      },
      error: error => {
        this.toastService.error('Founder Error', `Founder is not created successfully.`);
        console.error(contact, message, this.data, error);
      }
    });

  }
  verifyOTP(otp: string) {
    if (this.founder && this.founder.founderID !== null && !!this.data) {
      let url = `${location.origin}${AppSettings.ACCOUNT_PATH}?qrCode=${this.data.qrCode}`;
      this.qrService.confirmFoundPersonOTP(this.founder.founderID || -1, otp, this.data.id, url).subscribe({
        next: data => {
          this.toastService.success('Verify', 'Notification is sent successfully to the QR owner');
        },
        error: error => {
          this.toastService.error('Verify Error', 'Founder contact is not verified successfully.')
          console.error(this.founder, this.data, otp, error);
        }
      })
    }

  }
}
