import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings } from '../constants';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../services/qr/qr.service';
import { User } from '../interfaces/userInfoInterface';
import { UserShowType } from "../interfaces/userInfoInterface";
import { QRUserRelationDetailResponseInterface } from '../interfaces/qrUserRelationResponseInterface';

@Component({
  selector: 'app-qr-founder-page',
  templateUrl: './qr-founder-page.component.html',
  styleUrls: ['./qr-founder-page.component.css']
})
export class QRFounderPageComponent {
  qrID: number = -1
  acceptContant: boolean = false

  constructor(
    private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute, private qrService: QrService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let qr: any = params['qrCode'];
      console.log(qr)
      this.qrID = qr;

      this.qrService.getUserQRRelationDetail(qr).subscribe({
        next: data => {
          if(data.user?.email !== undefined){
            this.acceptContant = data.acceptContact
          }
        }, error: error => {
          console.log(`Unexpected error exists Error is ${error}`)
        }
      })

    });
  }
}
