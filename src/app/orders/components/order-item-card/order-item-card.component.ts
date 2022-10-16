import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss'],
})
export class OrderItemCardComponent implements OnInit, OnChanges {
  @Input() item?: OrderItem;
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

  public itemQuantity = new FormControl(0);

  public draggable: { data: string | null; effectAllowed: 'move' } = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: null,
    effectAllowed: 'move',
  };

  ngOnInit(): void {
    this.setQuantity();

    this.draggable.data = JSON.stringify(this.itemAlt || this.item);

    this.itemQuantity.valueChanges
      .pipe(
        debounceTime(200),
        tap((value) => {
          if (!value) {
            return;
          }
          this.emitEdit(value);
        })
      )
      .subscribe();
  }
  ngOnChanges(): void {
    if (this.item) {
      return;
    }

    this.setQuantity();
  }

  emitRemove() {
    this.removeItem.emit();
  }

  emitAdd() {
    this.addItem.emit();
  }

  emitEdit(quantity: number) {
    console.log('quantity', quantity);
    // if (!quantity || !String(quantity).length) {
    //   quantity = 1;
    //   this.setQuantity(1);
    // }

    this.editQuantity.emit(quantity);
    return;
  }

  getHostname(url: string): string {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  }

  public debounce(fn: Function, ms = 300) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  private setQuantity(value?: number) {
    const iQuantity = this.item?.itemQuantity;
    const iAltQuantity = this.itemAlt?.itemQuantity;
    const dismissEvent = { emitEvent: false };

    if (iQuantity) {
      this.itemQuantity.setValue(iQuantity, dismissEvent);
    }

    if (iAltQuantity) {
      this.itemQuantity.setValue(iAltQuantity, dismissEvent);
    }

    if (value) {
      this.itemQuantity.setValue(value, dismissEvent);
    }
  }

  public getQuantity() {
    const qt = this.itemQuantity.value;
    if (!qt) {
      return 0;
    }

    return qt;
  }
}
