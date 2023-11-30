import { Component } from '@angular/core';
import { AppSettings } from 'src/app/constants';

@Component({
  selector: 'app-base-toolbar',
  templateUrl: './base-toolbar.component.html',
  styleUrls: ['./base-toolbar.component.css']
})
export class BaseToolbarComponent {
  accountPath: string = AppSettings.ACCOUNT_PATH;
}
