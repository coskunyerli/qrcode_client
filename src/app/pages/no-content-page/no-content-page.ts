import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../../constants';
import { CheckQRResponseInterface } from '../../interfaces/checkQRResponseInterface'
import { QRUserRelationDetailResponseInterface } from '../../interfaces/qrUserRelationResponseInterface'
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-qr-page',
  templateUrl: './no-content-page.component.html',
  styleUrls: ['./no-content-page.component.css']
})
export class NoContentPageComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }
}
