import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './containers/create/create.component';
import { UsersComponent } from './containers/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/browse',
    pathMatch: 'full',
  },
  {
    path: 'browse',
    component: UsersComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
