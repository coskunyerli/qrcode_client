import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings } from '../constants';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }
  qrList: Array<any> = [];
  selectedIndex: number = -1;
  ngOnInit() {
    this.getList();
  }
  getList() {
    this.http.get<any>(`${AppSettings.BASE_URL}/qr`).subscribe({
      next: data => {
        this.qrList = data;
        console.log(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
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
