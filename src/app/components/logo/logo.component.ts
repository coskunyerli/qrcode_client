import { Component, Input } from '@angular/core';
import { AppSettings } from 'src/app/constants';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {
  @Input() showHomePage: boolean = true;
  accountPath: string = AppSettings.ACCOUNT_PATH;

}
