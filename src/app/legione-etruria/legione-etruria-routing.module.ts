import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../auth/guards/user.guard';
import { VerifyGuard } from '../auth/guards/verify.guard';
import { InactiveAccountComponent } from './components/inactive-account/inactive-account.component';
import { AddItemComponent } from './containers/add-item/add-item.component';
import { AddOrderComponent } from './containers/add-order/add-order.component';
import { ConfirmOrderComponent } from './containers/confirm-order/confirm-order.component';
import { CurrentOrderComponent } from './containers/current-order/current-order.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DocumentsComponent } from './containers/documents/documents.component';
import { EditOrderComponent } from './containers/edit-order/edit-order.component';
import { HomeComponent } from './containers/home/home.component';
import { ItemsListComponent } from './containers/items-list/items-list.component';
import { OrdersDashboardComponent } from './containers/orders-dashboard/orders-dashboard.component';
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
        path: 'orders',
        canActivate: [VerifyGuard],
        children: [
          {
            path: '',
            redirectTo: '/orders/current',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',

            children: [
              {
                path: '',
                component: OrdersDashboardComponent,
              },
              {
                path: 'items',
                component: ItemsListComponent,
              },
            ],
          },
          {
            path: 'add',
            component: AddOrderComponent,
          },
          {
            path: 'edit',
            component: EditOrderComponent,
          },
          {
            path: 'current',
            children: [
              {
                path: '',
                component: CurrentOrderComponent,
              },
              {
                path: 'confirm-order',
                component: ConfirmOrderComponent,
              },
            ],
          },
          {
            path: 'items',
            children: [
              {
                path: 'add',
                component: AddItemComponent,
              },
            ],
          },
        ],
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
