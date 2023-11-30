import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { OtpEntryComponent } from './pages/otp-entry/otp-entry.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard, hasAuthGuard } from './guards/auth.guard';
import { AccountPageComponent } from './pages/account/account-page/account-page.component';
import { QrPageComponent } from './pages/qr-page/qr-page.component';
import { NoContentPageComponent } from './pages/no-content-page/no-content-page';
import { QRFounderPageComponent } from './pages/qr-founder-page/qr-founder-page.component';
import { SettingsPageComponent } from './pages/account/settings-page/settings-page.component';
import { BaseAccountComponent } from './pages/account/base-account/base-account.component';

const routes: Routes = [
  {
    path: 'not_found',
    component: NoContentPageComponent
  },
  {
    path: 'account',
    canActivate: [authGuard],
    component: BaseAccountComponent,
    children: [
      {
        path: '',
        component: AccountPageComponent
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'otp',
    component: OtpEntryComponent,
    canActivate: [hasAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [hasAuthGuard]
  },
  {
    path: 'qr_found',
    component: QRFounderPageComponent
  },
  {
    path: ':id', component: QrPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
