import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ManagementGuard } from './route-guards/management.guard';
import { MyAccountComponent } from './user-management/my-account/my-account.component';
import { UserManagementPanelComponent } from './user-management/user-management-panel/user-management-panel.component';

const routes: Routes = [
  { path: 'redirect', component: RedirectComponent },
  { path: 'public/login', component: LoginComponent },
  { path: 'create-my-account', component: MyAccountComponent },
  { path: 'edit-my-account', component: MyAccountComponent },
  { path: 'management/login', component: LoginComponent },
  {
    path: 'user-management',
    component: UserManagementPanelComponent,
    canActivate: [ManagementGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ManagementGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
