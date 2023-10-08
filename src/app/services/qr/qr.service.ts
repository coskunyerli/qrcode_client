import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/constants';
import { CheckQRResponseInterface, CheckUserRelationResponseInterface } from 'src/app/interfaces/checkQRResponseInterface';
import { QRUserRelationDetailResponseInterface, QRUserRelationResponseInterface } from 'src/app/interfaces/qrUserRelationResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient) { }

  checkUserQRRelation(qrID: string): Observable<CheckUserRelationResponseInterface> {
    return this.http.get<CheckUserRelationResponseInterface>(`${AppSettings.BASE_URL}/qr/check/${qrID}`);
  }

  checkQRExist(qrID: string): Observable<CheckQRResponseInterface> {
    return this.http.put<CheckQRResponseInterface>(`${AppSettings.BASE_URL}/qr/check/`, { qrID: qrID });
  }

  getUserQRRelationDetail(id: number): Observable<QRUserRelationDetailResponseInterface> {
    return this.http.get<QRUserRelationDetailResponseInterface>(`${AppSettings.BASE_URL}/userqrrelation/${id}`);
  }

  createUserQRRelation(data: object): object {
    return {};
  }

  getQRList(): Observable<Array<QRUserRelationResponseInterface>> {
    return this.http.get<Array<QRUserRelationResponseInterface>>(`${AppSettings.BASE_URL}/qr`);
  }


}
