import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from 'src/app/models/order-item';
import { ParcelTracker } from 'src/app/models/parcel-tracker';
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
    | 'staticItems'
    | 'tracking'
  )[] = [];
  public apiLoaded = new Observable<boolean>();

  public activeTracking?: ParcelTracker;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  //a function that asks for an OrderItems array and sums all the items quantities
  getTotalQuantity(items: OrderItem[]): number {
    return (
      items
        ?.filter(
          (i) => !['cancelled', 'pending-confirmation'].includes(i.itemStatus)
        )
        .reduce((acc, item) => acc + item.itemQuantity, 0) || 0
    );
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
}
