import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { OrderItem } from '../../../models/order-item';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent {
  public order$ = this.ordersService.ordersSubject$.pipe(
    tap(() => (this.loading = false))
  );
  public loading = false;

  public instructionsBody = `Sei sicuro di voler confermare l'acquisto di questi articoli? <br /> Scegliendo 'Salda via Paypal' verrai reindirizzato ad un link paypal.me per saldare il tuo ordine ed esso sarà automaticamente confermato, <br /> Scegliendo 'Salda sul campo' invece gli oggetti verranno segnalati come 'Non pagato' fino a quando non verrà saldato il debito. <br /><br /> Tutti gli oggetti inseriti sono arrotondati alla cifra piena più vicina per facilitare le transazioni <br />(per esempio. €33.15 diventa €33; €10.95 diventa €11).`;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public getPendingConfirmationItems(orderItems: OrderItem[]) {
    const items = orderItems.filter(
      (i) => i.itemStatus === 'pending-confirmation'
    );
    if (!items.length) {
      this.toastr.warning('Non ci sono oggetti da confermare');
      this.router.navigate(['/orders/current']);
    }
    return items;
  }

  public confirmItems(
    items: OrderItem[],
    paymentMethod: OrderItem['paymentMethod']
  ) {
    this.loading = true;
    const itemIds = items.map((i) => i._id);
    this.ordersService
      .confirmItems(itemIds, paymentMethod)
      .pipe(
        switchMap((i) => this.ordersService.getCurrentOrder()),
        tap(() => {
          this.loading = false;
          'paypal' === paymentMethod
            ? this.toastr.info('Reindirizzo a paypal.me')
            : this.toastr.success('Oggetti confermati');
          'paypal' === paymentMethod
            ? (window.location.href = `https://paypal.me/legioneetruria/${this.getPriceToPay(
                items,
                'pending-confirmation'
              )}`)
            : this.router.navigate(['/orders/current']);
        }),
        catchError(async (err) => {
          this.loading = false;
          this.toastr.error(err.error.errors[0].message);
        })
      )
      .subscribe();
  }

  //a function that sums all the items' prices that have an itemstatus of 'pending-payment'
  getPriceToPay(
    items: OrderItem[],
    condition: OrderItem['itemStatus']
  ): number {
    return (
      items?.reduce((acc: number, curr) => {
        if (curr.itemStatus === condition) {
          return acc + this.roundPrice(curr) * curr.itemQuantity;
        }

        return acc;
      }, 0) || 0
    );
  }

  private roundPrice(item: OrderItem) {
    if (item.staticItem) {
      return item.itemPrice;
    }
    return Math.round(item.itemPrice);
  }
}
