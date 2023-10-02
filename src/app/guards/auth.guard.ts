import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../constants';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  createUrlTreeFromSnapshot
  let authService = inject(AuthService);
  let isAuth = authService.isAuthenticated();
  return isAuth.pipe(
    map((res: boolean) => {
      if (!res) {
        localStorage.setItem('redirectUrl', state.url);
        return createUrlTreeFromSnapshot(route, ['/', 'login'])
      } else {
        return true;
      }
    }));

};


export const hasAuthGuard: CanActivateFn = (route, state) => {
  createUrlTreeFromSnapshot
  let isAuth = inject(AuthService).isLocalAuthenticated();
  if (isAuth) {
    return createUrlTreeFromSnapshot(route, ['/', 'my_account']);
  } else {
    return true;
  }

};

