import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import {
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { StatusSvgEnum } from 'src/app/models/status-svg';
import { User } from '../../../auth/models/user';
import { GroupOrder } from '../../../models/group-order';
import { OrderItem } from '../../../models/order-item';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  private activeOrderSubject$ = new Subject<GroupOrder>();
  public activeOrder$: Observable<GroupOrder> = this.activeOrderSubject$;
  public filteredOrder$: Observable<OrderItem[]> = new Observable();

  public orderId = this.route.snapshot.queryParamMap.get('orderId') || '';
  public loading = true;
  public statusEnum = StatusSvgEnum;
  public searchField = new FormControl('');
  public ignoreDropdown = false;
  public showDropdowns: string[] = [];

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _lightbox: Lightbox
  ) {
    if (!this.orderId) {
      this.toastr.error('Nessun ordine selezionato');
      this.router.navigate(['/orders/dashboard']);
    }

    this.emitGetActiveOrder().subscribe();
  }

  ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    this.filteredOrder$ = combineLatest([this.activeOrder$, searchTerm$])
      .pipe(
        // debounceTime(200),
        map(([orderInstance, searchTerm]) =>
          orderInstance.items.filter((item) => {
            const itemsArr = [
              item.itemName,
              item.itemUrl,
              item.itemShop,
              item.itemStatus,
              item.itemQuantity.toString(),
              item.itemPrice.toString(),
              (item.user as User).battleName,
            ];

            return (
              searchTerm === '' ||
              itemsArr.some((i) =>
                i?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
          })
        )
      )
      .pipe(tap(() => (this.loading = false)));
  }

  public handleShowDropdown(user: string) {
    const index = this.showDropdowns.indexOf(user);
    if (-1 === index) {
      this.showDropdowns.push(user);
    } else {
      this.showDropdowns.splice(index, 1);
    }
  }

  public emitGetActiveOrder() {
    return this.ordersService.getOrder(this.orderId).pipe(
      tap((i) => {
        if (!i) {
          this.toastr.error('Ordine non trovato');
          this.router.navigate(['/orders/dashboard']);
          return;
        }

        this.loading = false;
        this.activeOrderSubject$.next(i);
      })
    );
  }

  public editItemStatus(item: string, itemStatus: OrderItem['itemStatus']) {
    this.loading = true;
    this.ordersService
      .editItem(item, { itemStatus })
      .pipe(
        tap(() => {
          this.toastr.success('Articolo aggiornato');
        }),
        switchMap(() => this.emitGetActiveOrder()),
        tap(() => (this.loading = false))
      )
      .subscribe();
  }

  open(index: number, orderItems: GroupOrder['items']): void {
    const album: IAlbum[] = orderItems.map((i) => ({
      src: i.imgSrc,
      caption: i.itemName,
      thumb: i.imgSrc,
      downloadUrl: i.imgSrc,
    }));
    // open lightbox
    this._lightbox.open(album, index);
  }

  //a function that groups items by user

  groupItemsByUser(activeOrder: OrderItem[]) {
    return activeOrder.reduce(
      (
        acc: {
          user: string;
          total: number;
          notPayed: number;
          notConfirmed: number;
          items: GroupOrder['items'];
        }[],
        curr
      ) => {
        const index = acc.findIndex(
          (item) => item.user === (curr.user as User).battleName
        );

        if (-1 === index) {
          return [
            ...acc,
            {
              user: (curr.user as User).battleName,
              total: !['cancelled', 'pending-confirmation'].includes(
                curr.itemStatus
              )
                ? curr.itemQuantity * curr.itemPrice
                : 0,
              notPayed: ['pending-payment'].includes(curr.itemStatus)
                ? curr.itemQuantity * curr.itemPrice
                : 0,
              notConfirmed: ['pending-confirmation'].includes(curr.itemStatus)
                ? curr.itemQuantity * curr.itemPrice
                : 0,
              items: [curr],
            },
          ];
        }

        acc[index].items.push(curr);
        acc[index].total += !['cancelled', 'pending-confirmation'].includes(
          curr.itemStatus
        )
          ? curr.itemQuantity * curr.itemPrice
          : 0;

        acc[index].notPayed += ['pending-payment'].includes(curr.itemStatus)
          ? curr.itemQuantity * curr.itemPrice
          : 0;
        acc[index].notConfirmed += ['pending-confirmation'].includes(
          curr.itemStatus
        )
          ? curr.itemQuantity * curr.itemPrice
          : 0;
        return acc;
      },
      []
    );
  }
}
