import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LightboxModule } from 'ngx-lightbox';
import { AuthModule } from '../auth/auth.module';
import { OrdersModule } from '../orders/orders.module';
import { SharedModule } from '../shared/shared.module';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { UsersModule } from '../users/users.module';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { InactiveAccountComponent } from './components/inactive-account/inactive-account.component';
import { ProfileProgressComponent } from './components/profile-progress/profile-progress.component';
import { AccountStatusBadgeComponent } from './components/user-bar/account-status-badge/account-status-badge.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DocumentsComponent } from './containers/documents/documents.component';
import { HomeComponent } from './containers/home/home.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { LegioneEtruriaRoutingModule } from './legione-etruria-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserBarComponent,
    AccountStatusBadgeComponent,
    InactiveAccountComponent,
    ProfileProgressComponent,
    DocumentsComponent,
    DocumentCardComponent,
    SettingsComponent,
  ],

  imports: [
    CommonModule,
    LegioneEtruriaRoutingModule,
    TailwindFormsModule,
    AuthModule,
    UsersModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    NgxChartsModule,
    OrdersModule,
  ],
  exports: [HomeComponent],
})
export class LegioneEtruriaModule {}
