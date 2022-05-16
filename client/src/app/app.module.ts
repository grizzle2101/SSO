import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDialogComponent } from './user-management/user-dialog/user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementPanelComponent } from './user-management/user-management-panel/user-management-panel.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectComponent } from './redirect/redirect.component';
import { TokenHelper } from './helpers/tokenHelper';
import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { DialogErrorStateMatcherModule } from './helpers/dialogErrorStateMatcherModule';
import { MyAccountComponent } from './user-management/my-account/my-account.component';
import { PasswordResetComponent } from './user-management/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDialogComponent,
    UserManagementPanelComponent,
    LoginComponent,
    RedirectComponent,
    DashboardComponent,
    MyAccountComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [TokenHelper, DialogErrorStateMatcherModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
