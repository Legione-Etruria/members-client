import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../auth/guards/user.guard';
import { VerifyGuard } from '../auth/guards/verify.guard';
import { InactiveAccountComponent } from './components/inactive-account/inactive-account.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DocumentsComponent } from './containers/documents/documents.component';
import { HomeComponent } from './containers/home/home.component';
import { SettingsComponent } from './containers/settings/settings.component';

//laazy load auth module
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'inactive-account',
        component: InactiveAccountComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerifyGuard],
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [VerifyGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [VerifyGuard],
      },
      {
        path: 'announcements',
        loadChildren: () =>
          import('../announcements/announcements.module').then(
            (m) => m.AnnouncementsModule
          ),
        canActivate: [VerifyGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../orders/orders.module').then((m) => m.OrdersModule),
        canActivate: [VerifyGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
        canActivate: [VerifyGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegioneEtruriaRoutingModule {}
