import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckQRResponseInterface } from '../interfaces/checkQRResponseInterface';
import { AppSettings } from '../constants';
import { QRUserRelationDetailResponseInterface } from '../interfaces/qrUserRelationResponseInterface';
import { QrService } from '../services/qr/qr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  qrID: string = '';
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private qrService: QrService) {

  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.qrID = data.get('qr') || '';
      if (!this.qrID) {
        this.router.navigate(['/my_account']);
      } else {
        this.qrService.checkQRExist(this.qrID).subscribe({
          next: data => {
            if (!data.has) {
              this.router.navigate(['/my_account']);
            } else {
              this.qrService.checkUserQRRelation(this.qrID).subscribe({
                next: data => {
                  if (data.has) {
                    this.router.navigate(['/my_account']);
                  }
                },
                error: error => {
                  console.log(error);
                  console.log(`Unexpected error exists Error is`)
                }
              })
            }
          },
          error: error => {
            console.log(error);
            console.log(`Unexpected error exists Error is`)
          }
        });
      }

    });
  }
  registerQR() {
    if (!this.qrID) {
      return;
    }
  }
}
