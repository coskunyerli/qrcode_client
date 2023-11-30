import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtpEntryComponent } from './pages/otp-entry/otp-entry.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { QRFounderPageComponent } from './pages/qr-founder-page/qr-founder-page.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { AuthService } from './services/auth/auth.service';
import { AccountPageComponent } from './pages/account/account-page/account-page.component';
import { QRCodeModule } from 'angular2-qrcode';
import { QrPageComponent } from './pages/qr-page/qr-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoContentPageComponent } from './pages/no-content-page/no-content-page';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

import { ToastrModule } from 'ngx-toastr';
import { SettingsPageComponent } from './pages/account/settings-page/settings-page.component';
import { BaseAccountComponent } from './pages/account/base-account/base-account.component';
import { BaseToolbarComponent } from './components/base-toolbar/base-toolbar.component';
import { OtpFieldComponent } from './components/otp-field/otp-field.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OtpEntryComponent,
    LoginComponent,
    AccountPageComponent,
    QrPageComponent,
    NoContentPageComponent,
    QRFounderPageComponent,
    SettingsPageComponent,
    BaseAccountComponent,
    BaseToolbarComponent,
    OtpFieldComponent,
    LogoComponent
  ],
  imports: [
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    AuthService,
    QRCodeModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
