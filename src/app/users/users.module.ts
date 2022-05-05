import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { TailwindActionsModule } from '../tailwind-actions/tailwind-actions.module';
import { RoleBadgeComponent } from './components/role-badge/role-badge.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateComponent } from './containers/create/create.component';
import { UsersComponent } from './containers/users/users.component';
import { UsersService } from './services/users.service';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    CreateComponent,
    UsersComponent,
    UsersTableComponent,
    RoleBadgeComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AuthModule,
    TailwindActionsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [UsersService],
  exports: [CreateComponent],
})
export class UsersModule {}
