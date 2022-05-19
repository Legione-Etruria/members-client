import { Component, Input } from '@angular/core';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss'],
})
export class OrderItemCardComponent {
  @Input() item!: OrderItem;
  @Input() itemAlt?: {
    price?: number;
    imgSrc?: string;
    name?: string;
    itemUrl?: string;
    itemQuantity?: number;
  };

  getHostname(url: string): string {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  }
}
