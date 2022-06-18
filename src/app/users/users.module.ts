import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { TailwindActionsModule } from '../tailwind-actions/tailwind-actions.module';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { RoleBadgeComponent } from './components/role-badge/role-badge.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateComponent } from './containers/create/create.component';
import { UsersComponent } from './containers/users/users.component';
import { UsersService } from './services/users.service';
import { UsersRoutingModule } from './users-routing.module';
import { QuickSwitchComponent } from './containers/quick-switch/quick-switch.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    CreateComponent,
    UsersComponent,
    UsersTableComponent,
    RoleBadgeComponent,
    UserFormComponent,
    UserAvatarComponent,
    QuickSwitchComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AuthModule,
    TailwindActionsModule,
    TailwindFormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [UsersService],
  exports: [CreateComponent, UserFormComponent, UserAvatarComponent],
})
export class UsersModule {}
