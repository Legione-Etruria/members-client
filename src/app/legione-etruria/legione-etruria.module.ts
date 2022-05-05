import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { InactiveAccountComponent } from './components/inactive-account/inactive-account.component';
import { ProfileProgressComponent } from './components/profile-progress/profile-progress.component';
import { AccountStatusBadgeComponent } from './components/user-bar/account-status-badge/account-status-badge.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HomeComponent } from './containers/home/home.component';
import { LegioneEtruriaRoutingModule } from './legione-etruria-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserBarComponent,
    AccountStatusBadgeComponent,
    InactiveAccountComponent,
    ProfileProgressComponent,
  ],
  imports: [CommonModule, LegioneEtruriaRoutingModule, AuthModule],
  exports: [HomeComponent],
})
export class LegioneEtruriaModule {}
