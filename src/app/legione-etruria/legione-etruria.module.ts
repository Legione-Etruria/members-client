import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { LegioneEtruriaRoutingModule } from './legione-etruria-routing.module';
import { HomeComponent } from './containers/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, LegioneEtruriaRoutingModule, AuthModule],
})
export class LegioneEtruriaModule {}
