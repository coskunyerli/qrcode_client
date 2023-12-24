import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AppSettings } from 'src/app/constants';
import { CheckQRResponseInterface, CheckUserRelationResponseInterface } from 'src/app/interfaces/checkQRResponseInterface';
import { QRUserRelationCreateResponseInterface, QRUserRelationDetailResponseInterface, QRUserRelationResponseInterface } from 'src/app/interfaces/qrUserRelationResponseInterface';
import { ConfirmFoundPersonOTPResponseInterface, FoundPersonOTPResponseInterface } from 'src/app/interfaces/userInfoInterface';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http: HttpClient) { }

  checkUserQRRelation(qrID: string): Observable<CheckUserRelationResponseInterface> {
    return this.http.get<CheckUserRelationResponseInterface>(`${AppSettings.BASE_URL}/qr/check/${qrID}`);
  }

  checkQRExist(qrID: string): Observable<CheckQRResponseInterface> {
    return this.http.put<CheckQRResponseInterface>(`${AppSettings.BASE_URL}/qr/check`, { qrID: qrID });
  }

  updateUserQRRelationDetail(qrInfo: QRUserRelationDetailResponseInterface) {
    return this.http.put<QRUserRelationDetailResponseInterface>(`${AppSettings.BASE_URL}/qr/${qrInfo.id}`, qrInfo);
  }

  getUserQRRelationDetail(id: number): Observable<QRUserRelationDetailResponseInterface> {
    return this.http.get<QRUserRelationDetailResponseInterface>(`${AppSettings.BASE_URL}/userqrrelation/${id}`);
  }

  createUserQRRelation(qrID: string, name: string, message: string): Observable<QRUserRelationCreateResponseInterface> {
    return this.http.post<QRUserRelationCreateResponseInterface>(`${AppSettings.BASE_URL}/qr`, { qrCode: qrID, name: name, message: message });
  }

  deleteUserQRRelation(relationID: number): Observable<boolean> {
    return this.http.delete(`${AppSettings.BASE_URL}/qr/${relationID}`).pipe(map((res: any) => {
      return true;
    }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  getQRList(): Observable<Array<QRUserRelationResponseInterface>> {
    return this.http.get<Array<QRUserRelationResponseInterface>>(`${AppSettings.BASE_URL}/qr`);
  }

  createFoundQrRelation(relationID: number, message: string, foundContact: string): Observable<FoundPersonOTPResponseInterface> {
    return this.http.post<FoundPersonOTPResponseInterface>(`${AppSettings.BASE_URL}/found`,
      {
        relationID: relationID, message: message, found_contact: foundContact
      });
  }

  confirmFoundPersonOTP(foundPersonID: number, otp: string, relationID: number, url: string): Observable<ConfirmFoundPersonOTPResponseInterface> {
    return this.http.put<FoundPersonOTPResponseInterface>(`${AppSettings.BASE_URL}/found`,
      {
        found_person_id: foundPersonID, otp: otp, relationID: relationID, clientUrl: url
      });
  }

  removeFounderMessage(founderID: number): Observable<boolean> {
    return this.http.delete(`${AppSettings.BASE_URL}/found/${founderID}`).pipe(map((res: any) => {
      return true;
    }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  sendInformationToFounder(founderID: number): Observable<boolean> {
    return this.http.post(`${AppSettings.BASE_URL}/send_contact`,
      {
        founderID: founderID
      }).pipe(map((res: any) => {
        return true;
      }),
        catchError((error) => {
          return of(false);
        })
      );
  }

}
