import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { OrderItem } from '../../../models/order-item';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-compare-cart',
  templateUrl: './compare-cart.component.html',
  styleUrls: ['./compare-cart.component.scss'],
})
export class CompareCartComponent implements OnInit {
  public shop: string = this.route.snapshot.queryParamMap.get('shop') || '';
  public orderId: string = this.route.snapshot.queryParamMap.get('order') || '';
  public mergedItems: OrderItem[] = [];
  public order$ = this.ordersService.getOrder(this.orderId).pipe(
    map((o) => ({
      ...o,
      items: o?.items.filter(
        (i) =>
          i.itemShop === this.shop &&
          ['pending-payment', 'confirmed'].includes(i.itemStatus)
      ),
    })),
    tap((o) => {
      console.log(o);
      this.mergedItems = this.mergeItems(o.items || []);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {}

  //merge the given items and sum the quantity in case of duplicates
  public mergeItems(items: OrderItem[]) {
    return items.reduce((acc: OrderItem[], curr) => {
      const index = acc.findIndex((i) => i.itemName === curr.itemName);
      if (index === -1) {
        acc.push(curr);
      } else {
        acc[index].itemQuantity += curr.itemQuantity;
      }
      return acc;
    }, []);
  }

  //a function that sums all the items' prices that have an itemstatus of 'pending-payment'
  getPriceToPay(items: OrderItem[]): number {
    return (
      items?.reduce((acc: number, curr) => {
        return acc + curr.itemPrice * curr.itemQuantity;
      }, 0) || 0
    );
  }
}
