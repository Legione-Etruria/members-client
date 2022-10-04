import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';
import { GroupOrder } from 'src/app/models/group-order';
import { OrderItem } from '../../../models/order-item';
import { OrdersService } from '../../services/orders.service';

type editedOrder = GroupOrder & {
  items: (OrderItem & { ids: string[] })[];
};

@Component({
  selector: 'app-compare-cart',
  templateUrl: './compare-cart.component.html',
  styleUrls: ['./compare-cart.component.scss'],
})
export class CompareCartComponent implements OnInit {
  public shop: string = this.route.snapshot.queryParamMap.get('shop') || '';
  public orderId: string = this.route.snapshot.queryParamMap.get('order') || '';

  public orderSubj$ = new Subject<editedOrder | null>();

  public order$: Observable<editedOrder | null> = this.orderSubj$;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.emitGetOrder().subscribe();
  }

  //merge the given items and sum the quantity in case of duplicates
  public mergeItems(items: OrderItem[]) {
    return items.reduce((acc: (OrderItem & { ids: string[] })[], curr) => {
      const index = acc.findIndex((i) => i.itemName === curr.itemName);

      if (index === -1) {
        return [
          ...acc,
          { ...curr, ids: [curr._id], isChecked: curr.isChecked },
        ];
      }

      acc[index].itemQuantity += curr.itemQuantity;
      acc[index].ids.push(curr._id);

      if (acc[index].isChecked) {
        acc[index].isChecked = curr.isChecked;
      }

      return acc;
    }, []);
  }

  //a function that sums all the items' prices that have an itemstatus of 'pending-payment'
  public getTotal(items: OrderItem[]): number {
    return (
      items?.reduce((acc: number, curr) => {
        return curr.itemPrice * curr.itemQuantity + acc;
      }, 0) || 0
    );
  }

  public toggleChecked(item: editedOrder['items'][0], value: boolean) {
    this.ordersService
      .toggleChecked(item.ids, value)
      .pipe(switchMap((i) => this.emitGetOrder()))
      .subscribe();
  }

  public emitGetOrder() {
    return this.ordersService.getOrder(this.orderId).pipe(
      map((o) => ({
        ...o,
        items: o?.items.filter(
          (i) =>
            i.itemShop === this.shop &&
            (['pending-payment', 'confirmed'].includes(i.itemStatus) ||
              (i.itemStatus === 'cancelled' && i.isUnavailable))
        ),
      })),
      map((o) => ({
        ...o,
        items: this.mergeItems(o.items || []),
      })),
      tap((i: any) => this.orderSubj$.next(i))
    );
  }

  public onDrop(e: any) {
    console.log(e);
  }

  public mapIds(items: OrderItem[]) {
    return items.map((i) => i._id);
  }
}
