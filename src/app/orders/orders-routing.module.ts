import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './containers/add-item/add-item.component';
import { AddOrderComponent } from './containers/add-order/add-order.component';
import { CompareCartComponent } from './containers/compare-cart/compare-cart.component';
import { ConfirmOrderComponent } from './containers/confirm-order/confirm-order.component';
import { CurrentOrderComponent } from './containers/current-order/current-order.component';
import { EditOrderComponent } from './containers/edit-order/edit-order.component';
import { ItemsListComponent } from './containers/items-list/items-list.component';
import { OrdersDashboardComponent } from './containers/orders-dashboard/orders-dashboard.component';
import { ParcelTrackingComponent } from './containers/parcel-tracking/parcel-tracking.component';

const routes: Routes = [
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
      {
        path: 'compare',
        component: CompareCartComponent,
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
  {
    path: 'track',
    component: ParcelTrackingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
