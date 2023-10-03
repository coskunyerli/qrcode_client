import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { OtpEntryComponent } from './otp-entry/otp-entry.component';
import { LoginComponent } from './login/login.component';
import { authGuard, hasAuthGuard } from './guards/auth.guard';
import { AccountPageComponent } from './account-page/account-page.component';
import { QrPageComponent } from './qr-page/qr-page.component';
import { NoContentPageComponent } from './no-content-page/no-content-page';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard]
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
    path: 'my_account',
    component: AccountPageComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'qr/:id', component: QrPageComponent 
  },
  { 
    path: '**',
    pathMatch: 'full', 
    component: NoContentPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
