import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppSettings } from '../constants';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  contact: string = ''
  otpValue: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }
}
