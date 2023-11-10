import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QrService } from '../services/qr/qr.service';

@Component({
  selector: 'app-registration-done',
  templateUrl: './registration-done.component.html',
  styleUrls: ['./registration-done.component.css']
})
export class RegistrationDoneComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private qrService: QrService) {

  }
  ngOnInit() {

  }
}
