import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings } from '../constants';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getList();
  }
  getList() {
    this.http.get<any>(`${AppSettings.BASE_URL}/qr`).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  qrCodeId = "NaN"
  qrEMail = "NaN"
  qrPhoneNumber = "NaN"

  onClickOnQR(e:string){
    this.qrCodeId = e;
    this.qrEMail = e + "@email.com"
    this.qrPhoneNumber = "0" + e + "9876";
  }
}
