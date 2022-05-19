import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { GroupOrder } from 'src/app/models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  public itemURL: string = '';
  public loading = true;

  public item!: fetchedItem;
  public isInvalid = false;

  public currentOrder$ = this.ordersService.ordersSubject$
    .asObservable()
    .pipe(tap(() => (this.loading = false)));

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService
  ) {}

  validateURL(url: string, currentOrder: GroupOrder) {
    const isUrl =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
        url
      );

    if (!isUrl) {
      this.isInvalid = true;
      return;
    }

    const isIlsemaforo =
      currentOrder.shops.includes('ilsemaforo') &&
      url.startsWith('https://www.ilsemaforo-softair.com');

    const isTaiwangun =
      currentOrder.shops.includes('taiwangun') &&
      url.startsWith('https://www.taiwangun.com/');

    if (!isIlsemaforo && !isTaiwangun) {
      this.isInvalid = true;
      return;
    }

    this.isInvalid = false;
    return;
  }

  getItemData() {
    this.loading = true;
    this.loading = true;
    this.ordersService
      .getItemData(this.itemURL)
      .pipe(
        tap((value) => {
          this.item = value;
          this.item.itemUrl = this.itemURL;
          this.item.itemQuantity = 1;
          this.loading = false;
        }),
        catchError(async (err) => {
          this.loading = false;
          this.toastrService.error(err.message);
        })
      )
      .subscribe();
  }
}
interface fetchedItem {
  price?: number;
  name?: string;
  imgSrc?: string;
  itemUrl?: string;
  itemQuantity?: number;
}
