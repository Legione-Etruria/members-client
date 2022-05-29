import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { TailwindFormsModule } from '../tailwind-forms/tailwind-forms.module';
import { UsersModule } from '../users/users.module';
import { CurrentOrderWidgetComponent } from './components/current-order-widget/current-order-widget.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { InactiveAccountComponent } from './components/inactive-account/inactive-account.component';
import { ItemsListWidgetComponent } from './components/items-list-widget/items-list-widget.component';
import { OrderActionComponent } from './components/order-action/order-action.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { OrderInstructionsComponent } from './components/order-instructions/order-instructions.component';
import { OrderItemCardComponent } from './components/order-item-card/order-item-card.component';
import { OrderStatusBadgeComponent } from './components/order-status-badge/order-status-badge.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProfileProgressComponent } from './components/profile-progress/profile-progress.component';
import { AccountStatusBadgeComponent } from './components/user-bar/account-status-badge/account-status-badge.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { AddItemComponent } from './containers/add-item/add-item.component';
import { AddOrderComponent } from './containers/add-order/add-order.component';
import { CurrentOrderComponent } from './containers/current-order/current-order.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DocumentsComponent } from './containers/documents/documents.component';
import { HomeComponent } from './containers/home/home.component';
import { OrdersDashboardComponent } from './containers/orders-dashboard/orders-dashboard.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { LegioneEtruriaRoutingModule } from './legione-etruria-routing.module';
import { OrdersService } from './services/orders.service';
import { ItemsListComponent } from './containers/items-list/items-list.component';
import { ItemStatusBadgeComponent } from './components/item-status-badge/item-status-badge.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserBarComponent,
    AccountStatusBadgeComponent,
    InactiveAccountComponent,
    ProfileProgressComponent,
    DocumentsComponent,
    DocumentCardComponent,
    SettingsComponent,
    CurrentOrderComponent,
    OrderItemCardComponent,
    OrderSummaryComponent,
    OrderInstructionsComponent,
    AddItemComponent,
    AddOrderComponent,
    OrderFormComponent,
    OrdersDashboardComponent,
    CurrentOrderWidgetComponent,
    OrderStatusBadgeComponent,
    OrderInfoComponent,
    OrderActionComponent,
    ItemsListWidgetComponent,
    ItemsListComponent,
    ItemStatusBadgeComponent,
  ],
  providers: [OrdersService],
  imports: [
    CommonModule,
    LegioneEtruriaRoutingModule,
    TailwindFormsModule,
    AuthModule,
    UsersModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
  ],
  exports: [HomeComponent],
})
export class LegioneEtruriaModule {}
