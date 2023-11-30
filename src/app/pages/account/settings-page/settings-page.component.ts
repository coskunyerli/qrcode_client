import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/userInfoInterface';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent {
  user: User = {
    id: -1,
    email: '',
    phoneNumber: '',
    backupPhoneNumber: null,
    first_name: '',
    last_name: ''
  };

  constructor(private toastService: ToastService, private userService: UserService) {

  }
  ngOnInit() {
    this.userService.getUserDetail().subscribe({
      next: data => {
        this.user = data;
      },
      error: error => {
        console.error(error);
        this.toastService.error('User Error', 'User info is not get successfully');
      }
    })
  }
  save() {
    this.userService.updateUserData(this.user).subscribe({
      next: data => {
        this.toastService.success('User Update', 'User is updated successfully');
      },
      error: error => {
        console.error(this.user, error);
        this.toastService.error('User Update', 'User is not updated successfully');
      }
    })
  }
}

