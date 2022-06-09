import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() removeItem = new EventEmitter<void>();
  @Output() addItem = new EventEmitter<void>();
  @Input() hideElements: ('removeItem' | 'itemStatus')[] = [];

  emitRemove() {
    this.removeItem.emit();
  }

  emitAdd() {
    this.addItem.emit();
  }

  getHostname(url: string): string {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  }
}
