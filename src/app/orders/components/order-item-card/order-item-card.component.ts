import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss'],
})
export class OrderItemCardComponent implements OnInit {
  @Input() item!: OrderItem;
  @Input() itemAlt?: {
    price?: number;
    imgSrc?: string;
    name?: string;
    itemUrl?: string;
    itemQuantity?: number;
    isUnavailable?: boolean;
  };
  @Input() showInput = false;
  @Output() removeItem = new EventEmitter<void>();
  @Output() addItem = new EventEmitter<void>();
  @Output() editQuantity = new EventEmitter<number>();
  @Output() checkedChanged = new EventEmitter<boolean>();
  @Input() hideElements: ('removeItem' | 'itemStatus' | 'checked')[] = [];

  public itemQuantity = 0;

  ngOnInit(): void {
    this.itemQuantity = this.itemAlt?.itemQuantity || this.item?.itemQuantity;
  }

  emitRemove() {
    this.removeItem.emit();
  }

  emitAdd() {
    this.addItem.emit();
  }

  emitEdit(quantity: number) {
    if (!quantity) {
      quantity = 1;
      this.itemQuantity = 1;
    }

    this.editQuantity.emit(quantity);
  }

  getHostname(url: string): string {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  }
}
