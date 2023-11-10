import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../constants';
import { CheckQRResponseInterface } from '../interfaces/checkQRResponseInterface'
import { QRUserRelationDetailResponseInterface } from '../interfaces/qrUserRelationResponseInterface'
import { QrService } from '../services/qr/qr.service';

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css']
})
export class QrPageComponent {
  qrID: string = '';
  userQRRelationID: number = -1;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private qrService: QrService) {

  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      let qrID: string = params['id'];
      this.qrID = qrID;

      this.qrService.checkQRExist(qrID).subscribe({
        next: data => {
          if (!data.has) {
            this.router.navigate(['not_found']);
          } else {
            this.qrService.checkUserQRRelation(qrID).subscribe({
              next: data => {
                if (data.has) {
                  let id = data.relationID || -1;
                  this.userQRRelationID = id;
                } else {
                  
                  this.router.navigate(['/register'], { queryParams: { qr: qrID }, replaceUrl: true })
                }
              }, error: error => {
                console.log(`Unexpected error exists Error is ${error}`)
              }
            });
          }
        }
      })

    });
  }

  editQRCode() {
    if (this.qrID.length === 0) {
      return;
    }

    this.router.navigate(['/my_account'], { queryParams: { qrCode: this.qrID }, replaceUrl: true })
    //navigate detail qr page and enable edit in my acoount endpoint
    //register if the qr code has not been registered yet
  }
  qrFoundByPerson() {
    if (this.qrID.length === 0) {
      return;
    }

    this.router.navigate(['/qr_found'], { queryParams: { id: this.userQRRelationID }, replaceUrl: true })
    // navigate contact page of founded person enter contact text or add message 
  }
}
