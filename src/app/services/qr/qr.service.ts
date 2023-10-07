import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/constants';
import { QRUserRelationResponseInterface } from 'src/app/interfaces/qrUserRelationResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient) { }

  hasUserQRRelation(qrID: string): boolean {
    return true;
  }

  getUserQRRelation(id: number): object {
    return {};
  }

  createUserQRRelation(data: object): object {
    return {};
  }

  getQRList(): Observable<Array<QRUserRelationResponseInterface>> {
    return this.http.get<Array<QRUserRelationResponseInterface>>(`${AppSettings.BASE_URL}/qr`);
  }


}
