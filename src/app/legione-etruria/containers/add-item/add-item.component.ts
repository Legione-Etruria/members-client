import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GroupOrder } from 'src/app/models/group-order';
import { fetchedItem, OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  public itemURL: string = '';
  public itemQuantity = 1;
  public loading = false;

  public userId = this.route.snapshot.queryParamMap.get('user');
  public userLabel = this.route.snapshot.queryParamMap.get('userBattleName');

  public item!: fetchedItem | null;
  public isInvalid = false;
  public invalidMessage = '';

  public currentOrder$ = this.ordersService.ordersSubject$.asObservable();
  public currentUser = this.authService.currentUserValue;

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService,
    private routerService: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  validateURL(url: string, currentOrder: GroupOrder) {
    const isUrl =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
        url
      );

    if (!isUrl) {
      this.isInvalid = true;
      this.invalidMessage = 'URL non valido';
      return;
    }

    if (currentOrder.items.find((item) => item.itemUrl === url)) {
      this.isInvalid = true;
      this.invalidMessage = "Oggetto già presente nell'ordine";
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

    this.item.userId = this.userId || undefined;

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
        tap(() =>
          this.routerService.navigate([
            this.currentUser.role === 'admin'
              ? '/orders/dashboard'
              : '/orders/current',
          ])
        )
      )
      .subscribe();
  }
}
