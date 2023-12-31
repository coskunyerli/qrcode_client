import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../../services/qr/qr.service';
import { ToastService } from '../../services/toast/toast.service';
import { AppSettings } from 'src/app/constants';

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css']
})
export class QrPageComponent {
  qrID: string = '';
  userQRRelationID: number = -1;
  constructor(private toastService: ToastService, private route: ActivatedRoute, private router: Router, private qrService: QrService) {

  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      let qrID: string = params['id'];
      this.qrID = qrID;

      this.qrService.checkQRExist(qrID).subscribe({
        next: data => {
          if (!data.has) {
            this.router.navigate(['not_found']);
          } else {
            this.qrService.checkUserQRRelation(qrID).subscribe({
              next: data => {
                if (data.has) {
                  if (data.isOwner) {
                    this.router.navigate([AppSettings.ACCOUNT_PATH], { queryParams: { qrCode: this.qrID }, replaceUrl: true })
                  } else if (!data.inUse) {
                    this.router.navigate(['not_found']);
                  } else {
                    let id = data.relationID || -1;
                    this.userQRRelationID = id;
                    this.router.navigate(['/qr_found'], { queryParams: { id: this.userQRRelationID }, replaceUrl: true })
                  }

                } else {
                  this.router.navigate(['/register'], { queryParams: { qr: qrID }, replaceUrl: true })
                }
              }, error: error => {
                this.toastService.error('QR Error', 'QR detail is not get successfully.');
                console.error(qrID, error);
              }
            });
          }
        },
        error: error => {
          this.toastService.error('QR Error', 'QR detail is not get successfully.');
          console.error(qrID, error);
        }
      })

    });
  }
}
