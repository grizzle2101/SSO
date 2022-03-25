import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ManagementGuard } from './route-guards/management.guard';
import { UserManagementPanelComponent } from './user-management-panel/user-management-panel.component';

const routes: Routes = [
  { path: 'redirect', component: RedirectComponent },
  { path: 'public/login', component: LoginComponent },
  { path: 'management/login', component: LoginComponent },
  {
    path: '',
    component: UserManagementPanelComponent,
    canActivate: [ManagementGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}