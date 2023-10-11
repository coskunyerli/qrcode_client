import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings } from '../constants';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../services/qr/qr.service';
import { QRUserRelationResponseInterface } from '../interfaces/qrUserRelationResponseInterface';
import { NonNullAssert } from '@angular/compiler';
import { UserShowType } from '../interfaces/userInfoInterface';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute, private qrService: QrService) { }
  qrList: Array<QRUserRelationResponseInterface> = [];
  selectedIndex: number = -1;

  displayedOption_ShowPhone: boolean = false;
  displayedOption_ShowMessage: boolean = false;
  displayedOption_QRIsInUse: boolean = false;
  displayedOption_AcceptContact: boolean = false;
  displayedOption_UseBackupNumber: boolean = false;
  displayedOption_Visibility: UserShowType = UserShowType.INVISIBLE;
  displayedMessage: string = 'no message';

  //textAreaFormControl = new FormControl('', [Validators.maxLength(500)]);

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.qrService.getQRList().subscribe({
        next: data => {
          this.qrList = data;
          if (params.has('qrCode')) {
            let paramQR = params.get("qrCode");
            let index = this.qrList.findIndex((data) => {
              return data.qrCode.id.toString() == paramQR;
            });
            this.selectedIndex = index;
            this.setQRCodeInfo(index);
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    });
  }

  onClickOnQR(index: number) {
    this.selectedIndex = index;
    // update url without navigate 
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { qrCode: this.qrList[this.selectedIndex].qrCode.id },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    this.setQRCodeInfo(index);
  }
  setQRCodeInfo(index: number){
    let qrInfo: QRUserRelationResponseInterface = this.qrList[index];

    this.displayedOption_AcceptContact = qrInfo.acceptContact;
    this.displayedOption_QRIsInUse = qrInfo.inUse;
    //this.displayedOption_ShowMessage
    //this.displayedOption_ShowPhone
    this.displayedOption_Visibility = qrInfo.visibility;
    //this.displayedMessage
  }

  save(){
    let newQRInfo: QRUserRelationResponseInterface = {
      id: this.qrList[this.selectedIndex].id,
      userQRRelationID: this.qrList[this.selectedIndex].userQRRelationID,
      user: this.qrList[this.selectedIndex].user,
      qrCode: this.qrList[this.selectedIndex].qrCode,

      acceptContact: this.displayedOption_AcceptContact,
      useBackupNumber: this.displayedOption_UseBackupNumber,
      inUse: this.displayedOption_QRIsInUse,
      visibility: this.displayedOption_Visibility,
      message: this.displayedMessage
    };
    this.qrService.updateUserQRRelationDetail(newQRInfo).subscribe({
      next: data => {
        
      },
      error: error => {
        console.log(error);
        console.log(`Unexpected error exists Error is`)
      }
    });
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
