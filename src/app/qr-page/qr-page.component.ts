import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../constants';
import { CheckQRResponseInterface } from '../interfaces/checkQRResponseInterface'
import { QRUserRelationResponseInterface } from '../interfaces/qrUserRelationResponseInterface'

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css']
})
export class QrPageComponent {
  qrID: string = '';
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {

  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      let qrID: string = params['id'];
      this.qrID = qrID;
      this.http.get<CheckQRResponseInterface>(`${AppSettings.BASE_URL}/qr/${qrID}`).subscribe({
        next: data => {
          if (data.has) {
            this.http.get<QRUserRelationResponseInterface>(`${AppSettings.BASE_URL}/userqrrelation/${data.userQRRelationID}`).subscribe({
              next: data => {
                console.log(data);
              },
              error: error => {

              }
            })
          } else {
            this.router.navigate(['/register'], { queryParams: { qr: qrID } })
          }
        }, error: error => {
          console.log(`Unexpected error exists Error is ${error}`)
        }
      });
    });
  }
}
