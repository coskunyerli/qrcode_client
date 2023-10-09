import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../constants';
import { CheckQRResponseInterface } from '../interfaces/checkQRResponseInterface'
import { QRUserRelationDetailResponseInterface } from '../interfaces/qrUserRelationResponseInterface'

@Component({
  selector: 'app-qr-page',
  templateUrl: './no-content-page.component.html',
  styleUrls: ['./no-content-page.component.css']
})
export class NoContentPageComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {

  }
  ngOnInit(){

  }
}
