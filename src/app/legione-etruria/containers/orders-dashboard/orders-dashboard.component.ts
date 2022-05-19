import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.scss'],
})
export class OrdersDashboardComponent implements OnInit {
  public currentOrder$: Observable<GroupOrder | null> =
    this.ordersService.ordersSubject$;
  public pastOrders$ = this.ordersService
    .getOrders()
    .pipe(tap(() => (this.loading = false)));

  public activeOrder?: GroupOrder;
  loading = true;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  assignInitialActiveOrder(order: GroupOrder) {
    if (order.no_order || this.activeOrder) {
      return;
    }
    this.activeOrder = order;
  }

  onActionSelected(action?: 'issued' | 'cancelled') {
    this.loading = true;
    if (!this.activeOrder || !action) {
      return;
    }

    this.ordersService
      .editOrder({
        orderStatus: action,
        orderID: this.activeOrder?._id,
      })
      .pipe(
        tap(() => this.toastr.success('Ordine aggiornato')),
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() => (this.loading = false))
      )
      .subscribe();
  }
}
