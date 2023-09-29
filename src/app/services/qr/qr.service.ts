import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor() { }

  hasUserQRRelation(qrID: string): boolean {
    return true;
  }

  getUserQRRelation(id: number): object {
    return {};
  }

  createUserQRRelation(data: object): object {
    return {};
  }


}
