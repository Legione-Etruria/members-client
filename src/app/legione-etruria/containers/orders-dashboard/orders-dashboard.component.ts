import { Component, OnInit } from '@angular/core';
import { LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { UsersService } from 'src/app/users/services/users.service';
import { environment } from '../../../../environments/environment';
import { GroupOrder } from '../../../models/group-order';
import { OrderItem } from '../../../models/order-item';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.scss'],
})
export class OrdersDashboardComponent implements OnInit {
  public ilsemaforoFreeShipping: { name: string; value: number }[] = [];
  public taiwangunFreeShipping: { name: string; value: number }[] = [];
  public qtAmountPerUser: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];
  public chartColors = {
    name: 'legio',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: ['#9C9E7F', '#BD8A00'],
  };
  public view: [number, number] = [600, 0];
  public LegendPos = LegendPosition.Below;

  private pastOrdersSubject$ = new ReplaySubject<GroupOrder[]>();
  public users$ = this.usersService.getUsers(
    environment.production ? 'athlete' : undefined
  );

  public currentOrder$: Observable<GroupOrder | null> =
    this.ordersService.ordersSubject$;
  public pastOrders$: Observable<GroupOrder[]> = this.pastOrdersSubject$;
  public activeOrder?: GroupOrder;
  loading = true;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.emitGetPastOrders().subscribe();
  }

  public assignInitialActiveOrder(order: GroupOrder) {
    if (order.no_order || this.activeOrder) {
      return;
    }
    this.activeOrder = order;
    this.formatItemsForCharts(order.items);
  }

  public reverseOrder(activeOrder: GroupOrder) {
    return activeOrder?.items?.slice().reverse().slice(0, 4);
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

  private emitGetPastOrders() {
    this.loading = true;
    return this.ordersService.getOrders().pipe(
      tap((value) => {
        this.loading = false;
        this.pastOrdersSubject$.next(value);
      })
    );
  }

  public onResize(event: any) {
    this.view = [100, event.target.innerWidth / 1.35];
  }

  public changeActiveOrder(order: GroupOrder) {
    this.formatItemsForCharts(order.items);

    this.activeOrder = order;
  }

  //format val into currency
  public formatCurrency(val: number) {
    return `€ ${val.toString().replace(',', '.')}`;
  }

  public formatItemsForCharts(items: OrderItem[]) {
    const usefulItems = items.filter(
      (i) => !['cancelled', 'pending-confirmation'].includes(i.itemStatus)
    );

    this.ilsemaforoFreeShipping = this._genAmountPriceChart(
      usefulItems,
      'ilsemaforo'
    );

    this.taiwangunFreeShipping = this._genAmountPriceChart(
      usefulItems,
      'taiwangun'
    );
  }

  private _genAmountPriceChart(
    items: OrderItem[],
    shop: OrderItem['itemShop']
  ) {
    return [
      {
        name: shop,
        value: items
          .filter((i) => i.itemShop === shop)
          .reduce(
            (acc: number, item) =>
              //sum items price and quantity
              (acc += item.itemPrice * item.itemQuantity),

            0
          ),
      },
    ];
  }
}
