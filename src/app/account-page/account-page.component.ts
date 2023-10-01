import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { AppSettings } from '../constants';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css', '../../styles.scss', '../../styles.css']
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
}
