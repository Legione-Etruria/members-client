import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../auth/guards/user.guard';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HomeComponent } from './containers/home/home.component';

//laazy load auth module
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegioneEtruriaRoutingModule {}
