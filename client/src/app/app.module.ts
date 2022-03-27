import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { FormsModule } from '@angular/forms';
import { UserManagementPanelComponent } from './user-management-panel/user-management-panel.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectComponent } from './redirect/redirect.component';
import { TokenHelper } from './helpers/tokenHelper';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    UserDialogComponent,
    UserManagementPanelComponent,
    LoginComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [TokenHelper],
  bootstrap: [AppComponent],
})
export class AppModule {}
