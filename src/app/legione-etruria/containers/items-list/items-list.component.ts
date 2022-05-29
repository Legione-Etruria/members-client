import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { User } from '../../../auth/models/user';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  private activeOrderSubject$ = new Subject<GroupOrder>();
  public orderId = this.route.snapshot.queryParamMap.get('orderId') || '';
  public activeOrder$: Observable<GroupOrder> = this.activeOrderSubject$;

  public loading = true;

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

  public cancelItem(item: string) {
    this.ordersService
      .editItem(item, { itemStatus: 'cancelled' })
      .pipe(
        tap(() => {
          this.toastr.success('Articolo aggiornato');
        }),
        switchMap(() => this.emitGetActiveOrder())
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

  groupItemsByUser(activeOrder: GroupOrder) {
    return activeOrder.items.reduce(
      (
        acc: { user: string; total: number; items: GroupOrder['items'] }[],
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
              total:
                'cancelled' !== curr.itemStatus
                  ? curr.itemQuantity * curr.itemPrice
                  : 0,
              items: [curr],
            },
          ];
        }

        acc[index].items.push(curr);
        acc[index].total +=
          'cancelled' !== curr.itemStatus
            ? curr.itemQuantity * curr.itemPrice
            : 0;
        return acc;
      },
      []
    );
  }
}
