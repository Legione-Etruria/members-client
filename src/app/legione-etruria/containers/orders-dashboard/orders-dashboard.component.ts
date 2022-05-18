import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {}

  assignInitialActiveOrder(order: GroupOrder) {
    if (order.no_order || this.activeOrder) {
      return;
    }
    this.activeOrder = order;
  }
}
