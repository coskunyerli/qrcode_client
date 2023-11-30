import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-otp-field',
  templateUrl: './otp-field.component.html',
  styleUrls: ['./otp-field.component.css']
})
export class OtpFieldComponent {

  @Output() valueChange = new EventEmitter<string>();
  otpValue1: string = '';
  otpValue2: string = '';
  otpValue3: string = '';
  otpValue4: string = '';
  otpValue5: string = '';
  otpValue6: string = '';

  value(otp0: string, otp1: string, otp2: string, otp3: string, otp4: string, otp5: string) {
    return otp0 + otp1 + otp2 + otp3 + otp4 + otp5;
  }
}
