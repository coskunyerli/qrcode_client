import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-base-account',
  templateUrl: './base-account.component.html',
  styleUrls: ['./base-account.component.css']
})
export class BaseAccountComponent {
  accountPath: string = AppSettings.ACCOUNT_PATH;

  constructor(private authService: AuthService, private router: Router) {

  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
