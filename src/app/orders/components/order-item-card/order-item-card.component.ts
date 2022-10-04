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
  @Input() hideElements: ('removeItem' | 'itemStatus' | 'checked')[] = [];
  @Input() disableDnd = true;
  @Output() removeItem = new EventEmitter<void>();
  @Output() addItem = new EventEmitter<void>();
  @Output() editQuantity = new EventEmitter<number>();
  @Output() checkedChanged = new EventEmitter<boolean>();

  public itemQuantity = 0;

  public draggable: { data: string | null; effectAllowed: 'move' } = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: null,
    effectAllowed: 'move',
  };

  ngOnInit(): void {
    this.itemQuantity = this.itemAlt?.itemQuantity || this.item?.itemQuantity;

    this.draggable.data = JSON.stringify(this.itemAlt || this.item);
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
