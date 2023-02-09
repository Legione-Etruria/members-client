import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EnumShops, GroupOrder } from 'src/app/models/group-order';
import { StaticItem } from 'src/app/models/static-item';
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

  public currentSelectedStaticItem = '';

  public item!: fetchedItem | null;
  public isInvalid = false;
  public invalidMessage = '';

  public currentOrder$ = this.ordersService.ordersSubject$.asObservable();
  public currentUser = this.authService.currentUserValue;

  public shops = EnumShops;

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService,
    private routerService: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public handleSelectedStaticItem = (item: StaticItem) => {
    if (this.currentSelectedStaticItem === item._id) {
      if (!this.item || !this.item.itemQuantity) {
        console.log('not found');
        return;
      }

      this.updateItemQuantity(this.item.itemQuantity + 1);
      return;
    }

    this.currentSelectedStaticItem = item._id;
    this.itemURL = '';

    this.item = {
      price: item.itemPrice,
      name: item.itemName,
      imgSrc: item.imgSrc,
      itemUrl: item.itemUrl,
      itemQuantity: 1,
      isUnavailable: false,
      staticItem: item._id,
    };
  };

  public validateURL(url: string, currentOrder: GroupOrder) {
    console.log('validateURL', url);
    const isUrl =
      /(([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?/.test(
        url
      );

    if (!isUrl) {
      this.isInvalid = true;
      this.invalidMessage = 'URL non valido';
      return;
    }

    if (
      currentOrder.items.find((item) => item.itemUrl === url) &&
      !this.userId
    ) {
      this.isInvalid = true;
      this.invalidMessage = "Oggetto già presente nell'ordine";
      return;
    }

    const isIlsemaforo =
      currentOrder.shops.includes(EnumShops.Ilsemaforo) &&
      url.startsWith('https://www.ilsemaforo-softair.com');

    const isTaiwangun =
      currentOrder.shops.includes(EnumShops.Taiwangun) &&
      url.startsWith('https://www.taiwangun.com/');

    if (!isIlsemaforo && !isTaiwangun) {
      this.isInvalid = true;
      this.invalidMessage = 'Negozio non valido';
      return;
    }

    this.isInvalid = false;
    return;
  }

  public updateItemQuantity(qta: number) {
    if (qta < 1) {
      qta = 1;
    }

    if (!this.item) {
      return;
    }

    this.item.itemQuantity = qta;

    this.item = Object.assign({}, this.item);
    // const itemTemp = this.item;
    // this.item = null;

    // setTimeout(() => {
    //   this.item = itemTemp;
    // }, 1);
  }

  getItemData() {
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
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() =>
          this.routerService.navigate([
            this.currentUser.role === 'admin'
              ? '/orders/dashboard'
              : '/orders/current',
          ])
        ),
        catchError(async (err) => {
          this.toastrService.error(
            err.error.errors[0].message,
            this.item?.name
          );
          this.loading = false;
        })
      )
      .subscribe();
  }
}
