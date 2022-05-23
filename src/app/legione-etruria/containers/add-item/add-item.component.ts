import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { GroupOrder } from 'src/app/models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  public itemURL: string = '';
  public itemQuantity = 1;
  public loading = false;

  public item!: fetchedItem | null;
  public isInvalid = false;

  public currentOrder$ = this.ordersService.ordersSubject$.asObservable();

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService,
    private routerService: Router
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

  updateItemQuantity() {
    if (this.itemQuantity < 1) {
      this.itemQuantity = 1;
    }

    if (!this.item) {
      return;
    }

    this.item.itemQuantity = this.itemQuantity;
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
          this.item.itemQuantity = this.itemQuantity;
          this.loading = false;
        }),
        catchError(async (err) => {
          this.loading = false;
          this.toastrService.error(err.message);
        })
      )
      .subscribe();
  }

  addItem(orderID: string) {
    if (!this.item) {
      return;
    }
    this.loading = true;

    this.ordersService
      .addItem(orderID, this.item)
      .pipe(
        tap(() => {
          this.toastrService.success(
            this.item?.name,
            "Oggetto aggiunto all'ordine"
          );
        }),
        catchError(async (err) =>
          this.toastrService.error(this.item?.name, err)
        ),
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() => this.routerService.navigate(['/orders/current']))
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
