import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppSettings, InfoMessage } from '../../../constants';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../../../services/qr/qr.service';
import { QRUserRelationResponseInterface } from '../../../interfaces/qrUserRelationResponseInterface';
import { UserShowType } from '../../../interfaces/userInfoInterface';
import { ToastService } from '../../../services/toast/toast.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  constructor(public dialog: MatDialog, private toastService: ToastService, private responsive: BreakpointObserver, private router: Router, private route: ActivatedRoute, private qrService: QrService) { }
  qrList: Array<QRUserRelationResponseInterface> = [];
  selectedIndex: number = -1;
  userShowType = UserShowType

  accountQRNameInfo: string = InfoMessage.accountQRNameInfo
  accountQRMessageInfo: string = InfoMessage.accountQRMessageInfo
  accountQRVisibilityInfo: string = InfoMessage.accountQRVisibilityInfo

  hideFounder: boolean = false
  hideQRList: boolean = false

  get selectedItem(): QRUserRelationResponseInterface {
    return this.qrList[this.selectedIndex] || {};
  }

  ngOnInit() {

    this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.Small]) {
          this.hideFounder = true;
          this.hideQRList = false;
        } else if (result.breakpoints[Breakpoints.XSmall]) {
          this.hideQRList = true;
          this.hideFounder = true;
        } else {
          this.hideFounder = false;
          this.hideQRList = false;
        }

      });

    this.route.queryParamMap.subscribe(params => {
      // update all list every update url
      this.qrService.getQRList().subscribe({
        next: data => {
          this.qrList = data;
          let index = -1;
          if (params.has('qrCode')) {
            let paramQR = params.get("qrCode");
            index = this.qrList.findIndex((data) => {
              return data.qrCode.id.toString() == paramQR;
            });
          }
          if (index < 0) {
            index = 0;
          }
          this.setCurrentIndex(index);
        },
        error: error => {
          this.toastService.error('QR Error', 'QR List is not get successfully');
          console.error(error);
        }
      });
    });
  }

  onClickOnQR(index: number) {
    this.setCurrentIndex(index);
  }

  save() {
    this.qrService.updateUserQRRelationDetail(this.selectedItem).subscribe({
      next: data => {
        this.toastService.success('QR Update', 'QR is updated successfully');
      },
      error: error => {
        this.toastService.error('QR Update Error', 'QR is not updated successfully.')
        console.error(this.selectedItem, error)
      }
    });
  }

  private setCurrentIndex(index: number) {
    if (this.selectedIndex === index || index >= this.qrList.length) {
      return;
    }

    this.selectedIndex = index;
    let params = {};
    if (this.selectedIndex > -1) {
      params = { qrCode: this.qrList[this.selectedIndex].qrCode.id };
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
        replaceUrl: true
      }
    );
  }

  acceptFounder(founderID: number) {
    this.qrService.sendInformationToFounder(founderID).subscribe({
      next: data => {
        if (data) {
          this.toastService.success('QR Update', 'Information is sent to the founder successfully');
        } else {
          console.log(`Information is not sen successfully to the user. Founder ID ${founderID}.`);
          this.toastService.error('QR Update', 'Information is not sent to the founder successfully');
        }
      },
      error: error => {
        console.error(founderID, error);
        this.toastService.error('QR Update', 'Information is not sent to the founder successfully');
      }
    })
  }

  removeMessage(founderID: number) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title: 'Delete Message', message: `Are you sure you want to do this?` }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.qrService.removeFounderMessage(founderID).subscribe({
          next: data => {
            if (data) {
              let index = this.selectedItem.foundQRList.findIndex((founderItem) => {
                return founderItem.id === founderID
              });
              this.toastService.success('QR Update', 'Information is sent to the founder successfully');
              this.selectedItem.foundQRList.splice(index, 1);
            } else {
              console.log(`Information is not sen successfully to the user. Founder ID ${founderID}.`);
              this.toastService.error('QR Update', 'Information is not sent to the founder successfully');
            }
          },
          error: error => {
            console.error(founderID, error);
            this.toastService.error('QR Update', 'Information is not sent to the founder successfully');
          }
        })
      }
    });
  }
}
