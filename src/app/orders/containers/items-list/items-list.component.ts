import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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
import { SvgEnum } from 'src/app/models/svg.enum';
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
  public statusEnum = SvgEnum;
  public searchField = new UntypedFormControl('');
  public ignoreDropdown = false;
  public showDropdowns: string[] = [];

  public orderStatus: GroupOrder['orderStatus'] = 'pending';

  public quickFilters = [
    {
      label: 'Nessun filtro',
      value: '',
      svgPath:
        'M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z',
    },
    {
      label: 'Non Pagato',
      value: 'pending-payment',
      svgPath: this.statusEnum.pendingPaymentIn,
    },
    {
      label: 'Da confermare',
      value: 'pending-confirmation',
      svgPath: this.statusEnum.pendingConfirmationIn,
    },
    {
      label: 'Pagato',
      value: 'confirmed',
      svgPath: this.statusEnum.confirmedIn,
    },
    {
      label: 'Annullato',
      value: 'cancelled',
      svgPath: this.statusEnum.cancelledIn,
    },
  ];

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
        tap((i) => (this.orderStatus = i[0].orderStatus)),
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

  public editItemCollectedState(item: string, state: boolean) {
    this.loading = true;
    this.ordersService
      .editItem(item, { isCollected: state })
      .pipe(
        tap(() => {
          this.toastr.success('Articolo aggiornato');
        }),
        switchMap(() => this.emitGetActiveOrder()),
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() => (this.loading = false))
      )
      .subscribe();
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
        switchMap(() => this.ordersService.getCurrentOrder()),
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

  checkUnavailable(items: OrderItem[]) {
    return items.filter((i) => i.isUnavailable === true);
  }

  //a function that groups items by user

  groupItemsByUser(activeOrder: OrderItem[]) {
    return activeOrder.reduce(
      (
        acc: {
          user: string;
          allCollected: boolean;
          total: number;
          notPayed: number;
          cancelled: number;
          confirmed: number;
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
              allCollected:
                'confirmed' === curr.itemStatus ? curr.isCollected : false,
              total: this.sumPrice(
                ['pending-confirmation', 'cancelled'],
                curr,
                true
              ),
              notPayed: this.sumPrice(['pending-payment'], curr),
              cancelled: this.sumPrice(['cancelled'], curr),
              confirmed: this.sumPrice(['confirmed'], curr),
              notConfirmed: this.sumPrice(['pending-confirmation'], curr),
              items: [curr],
            },
          ];
        }

        if (
          'confirmed' === curr.itemStatus &&
          acc[index].allCollected === true
        ) {
          acc[index].allCollected = curr.isCollected ? true : false;
        }

        acc[index].items.push(curr);
        acc[index].total += this.sumPrice(
          ['pending-confirmation', 'cancelled'],
          curr,
          true
        );

        acc[index].notPayed += this.sumPrice(['pending-payment'], curr);
        acc[index].cancelled += this.sumPrice(['cancelled'], curr);
        acc[index].confirmed += this.sumPrice(['confirmed'], curr);
        acc[index].notConfirmed += this.sumPrice(
          ['pending-confirmation'],
          curr
        );

        return acc;
      },
      []
    );
  }

  private sumPrice(
    conditions: OrderItem['itemStatus'][],
    item: OrderItem,
    negateCondition = false
  ) {
    if (
      conditions.includes(item.itemStatus) ||
      (negateCondition && !conditions.includes(item.itemStatus))
    ) {
      return item.itemQuantity * this.roundPrice(item);
    }
    return 0;
  }

  private roundPrice(item: OrderItem) {
    if (item.staticItem) {
      return item.itemPrice;
    }
    return Math.round(item.itemPrice);
  }
}
