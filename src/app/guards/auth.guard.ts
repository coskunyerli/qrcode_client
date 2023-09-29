import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../constants';

export const authGuard: CanActivateFn = (route, state) => {
  createUrlTreeFromSnapshot
  let isAuth = inject(AuthService).isAuthenticated();

  if (!isAuth) {
    localStorage.setItem('redirectUrl', state.url);
    return createUrlTreeFromSnapshot(route, ['/', 'login']);
  } else {
    // let http = inject(HttpClient);
    // http.get(`${AppSettings.BASE_URL}/login`).pipe(tap(data => { return true }),
    //   catchError((error) => { return false }));
    return true;
  }

};


export const hasAuthGuard: CanActivateFn = (route, state) => {
  createUrlTreeFromSnapshot
  let isAuth = inject(AuthService).isAuthenticated();
  if (isAuth) {
    return createUrlTreeFromSnapshot(route, ['/', 'my_account']);
  } else {
    return true;
  }

};

