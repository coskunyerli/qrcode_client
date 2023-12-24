import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { InfoMessage } from 'src/app/constants';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  contact: string = ''
  loginInfo: string = InfoMessage.loginInfo;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {
    if (this.contact) {
      this.userService.loginUser(this.contact).subscribe({
        next: data => {
          this.router.navigate(['otp'], { queryParams: { contact: this.contact } })
        },
        error: error => {
          console.error(this.contact, error);
          this.toastService.error('Login Error', 'Login is not done successfully');
        }
      });
    }
  }

}