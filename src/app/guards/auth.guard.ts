import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';
import { AppSettings } from '../constants';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let isAuth = authService.isAuthenticated();
  return isAuth.pipe(
    map((res: boolean) => {
      if (!res) {
        localStorage.setItem('redirectUrl', state.url);
        // logout if has token
        if (authService.isLocalAuthenticated()) {
          authService.logoutUser();
        }
        return createUrlTreeFromSnapshot(route, ['/', 'login'])
      } else {
        return true;
      }
    }));

};

export const hasAuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let isAuth = authService.isAuthenticated();
  return isAuth.pipe(
    map((res: boolean) => {
      if (res) {
        return createUrlTreeFromSnapshot(route, [AppSettings.ACCOUNT_PATH])
      } else {
        return true;
      }
    }));

};

