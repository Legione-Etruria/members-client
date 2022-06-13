import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrentOrderWidgetComponent } from './components/current-order-widget/current-order-widget.component';
import { FilterComponent } from './components/filter/filter.component';
import { ItemStatusBadgeComponent } from './components/item-status-badge/item-status-badge.component';
import { ItemsListWidgetComponent } from './components/items-list-widget/items-list-widget.component';
import { OrderActionComponent } from './components/order-action/order-action.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { OrderInstructionsComponent } from './components/order-instructions/order-instructions.component';
import { OrderItemCardComponent } from './components/order-item-card/order-item-card.component';
import { OrderStatusBadgeComponent } from './components/order-status-badge/order-status-badge.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LightboxModule } from 'ngx-lightbox';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ApiHttpModule } from '../api-http/api-http.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { UsersModule } from '../users/users.module';
import { AddItemWidgetComponent } from './components/add-item-widget/add-item-widget.component';
import { AddItemComponent } from './containers/add-item/add-item.component';
import { AddOrderComponent } from './containers/add-order/add-order.component';
import { CompareCartComponent } from './containers/compare-cart/compare-cart.component';
import { ConfirmOrderComponent } from './containers/confirm-order/confirm-order.component';
import { CurrentOrderComponent } from './containers/current-order/current-order.component';
import { EditOrderComponent } from './containers/edit-order/edit-order.component';
import { ItemsListComponent } from './containers/items-list/items-list.component';
import { OrdersDashboardComponent } from './containers/orders-dashboard/orders-dashboard.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersService } from './services/orders.service';

@NgModule({
  declarations: [
    AddItemComponent,
    AddOrderComponent,
    CompareCartComponent,
    ConfirmOrderComponent,
    CurrentOrderComponent,
    EditOrderComponent,
    ItemsListComponent,
    OrdersDashboardComponent,
    AddItemWidgetComponent,
    OrderItemCardComponent,
    OrderSummaryComponent,
    OrderInstructionsComponent,
    OrderFormComponent,
    CurrentOrderWidgetComponent,
    OrderStatusBadgeComponent,
    OrderInfoComponent,
    OrderActionComponent,
    ItemsListWidgetComponent,
    ItemStatusBadgeComponent,
    FilterComponent,
  ],
  providers: [OrdersService],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ApiHttpModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    NgxChartsModule,
    NgScrollbarModule,
    SharedModule,
    TailwindFormsModule,
    AuthModule,
    UsersModule,
    TailwindFormsModule,
  ],

  exports: [CurrentOrderWidgetComponent],
})
export class OrdersModule {}
