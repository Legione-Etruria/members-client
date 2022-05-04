import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from './containers/home/home.component';
import { LegioneEtruriaRoutingModule } from './legione-etruria-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, LegioneEtruriaRoutingModule, AuthModule],
  exports: [HomeComponent],
})
export class LegioneEtruriaModule {}
