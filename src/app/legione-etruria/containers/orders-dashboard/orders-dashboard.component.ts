import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.scss'],
})
export class OrdersDashboardComponent implements OnInit {
  private pastOrdersSubject$ = new ReplaySubject<GroupOrder[]>();
  public currentOrder$: Observable<GroupOrder | null> =
    this.ordersService.ordersSubject$;

  public pastOrders$: Observable<GroupOrder[]> = this.pastOrdersSubject$;

  public activeOrder?: GroupOrder;
  loading = true;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.emitGetPastOrders().subscribe();
  }

  assignInitialActiveOrder(order: GroupOrder) {
    if (order.no_order || this.activeOrder) {
      return;
    }
    this.activeOrder = order;
  }

  reverseOrder(activeOrder: GroupOrder) {
    return activeOrder?.items?.reverse().slice(0, 4);
  }

  onActionSelected(action?: 'issued' | 'cancelled') {
    this.loading = true;
    if (!this.activeOrder || !action) {
      return;
    }

    this.ordersService
      .editOrder(this.activeOrder?._id, {
        orderStatus: action,
      })
      .pipe(
        tap(() => this.toastr.success('Ordine aggiornato')),
        switchMap(() => this.ordersService.getCurrentOrder()),
        switchMap(() => this.emitGetPastOrders()),
        tap((val) => {
          this.activeOrder = val[0];
        })
      )
      .subscribe();
  }

  emitGetPastOrders() {
    this.loading = true;
    return this.ordersService.getOrders().pipe(
      tap((value) => {
        this.loading = false;
        this.pastOrdersSubject$.next(value);
      })
    );
  }
}
