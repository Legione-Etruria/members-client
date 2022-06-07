import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/order-item';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
})
export class OrderInfoComponent implements OnInit {
  @Input() currentOrder?: GroupOrder;
  @Input() isEditable = false;
  @Input() hideItems: (
    | 'shops'
    | 'status'
    | 'orderNotes'
    | 'id'
    | 'startDate'
    | 'endDate'
  )[] = [];

  constructor() {}

  ngOnInit(): void {}

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
          return acc + Math.round(curr.itemPrice) * curr.itemQuantity;
        }

        return acc;
      }, 0) || 0
    );
  }
}
