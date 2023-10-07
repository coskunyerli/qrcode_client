import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings } from '../constants';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../services/qr/qr.service';
import { QRUserRelationResponseInterface } from '../interfaces/qrUserRelationResponseInterface';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute, private qrService: QrService) { }
  qrList: Array<QRUserRelationResponseInterface> = [];
  selectedIndex: number = -1;
  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.qrService.getQRList().subscribe({
        next: data => {
          this.qrList = data;
          if (params.has('qrCode')) {
            let paramQR = params.get("qrCode");
            let index = this.qrList.findIndex((data) => {
              return data.qrCode.id.toString() == paramQR;
            });
            this.selectedIndex = index;
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    });
  }

  onClickOnQR(index: number) {
    this.selectedIndex = index;
    console.log(index);
  }
  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
