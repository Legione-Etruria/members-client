import { Component, Input } from '@angular/core';
import { differenceInDays, subDays } from 'date-fns';
import { EnumShops, GroupOrder } from 'src/app/models/group-order';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  @Input() currentOrder!: GroupOrder;
  @Input() items: OrderItem[] = [];

  public shops = EnumShops;

  constructor() {}
  //a function that asks for an OrderItems array and sums all the items quantities
  getTotalQuantity(items: OrderItem[]): number {
    return items?.reduce((acc, item) => acc + item.itemQuantity, 0) || 0;
  }

  //a function that sums all the items' prices that have an itemstatus of 'pending-payment'
  getPriceToPay(
    items: OrderItem[],
    condition: OrderItem['itemStatus']
  ): number {
    return (
      items?.reduce((acc: number, curr) => {
        if (curr.itemStatus === condition) {
          return acc + this.roundPrice(curr) * curr.itemQuantity;
        }

        return acc;
      }, 0) || 0
    );
  }

  private roundPrice(item: OrderItem) {
    if (item.staticItem) {
      return item.itemPrice;
    }
    return Math.round(item.itemPrice);
  }
  //a function that asks for an orderitem array and checks wheter or not at least one item has an itemstatus of 'pending-payment'
  isPaymentPending(items: OrderItem[]): boolean {
    return items?.some((item) => item.itemStatus === 'pending-payment');
  }

  lastOrderWeek() {
    return subDays(new Date(this.currentOrder.dueDate), 7);
  }

  isLastOrderWeek() {
    const today = new Date();
    return differenceInDays(new Date(this.currentOrder.dueDate), today) < 7;
  }
}
