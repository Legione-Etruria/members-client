import { Component } from '@angular/core';
import { differenceInDays } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss'],
})
export class CurrentOrderComponent {
  public currentOrderSubj$ = new Subject<GroupOrder | null>();

  public currentOrder$: Observable<GroupOrder | null> = this.currentOrderSubj$;

  public loading = false;

  public orderInstructionsBody = `Durante il periodo di un ordine di gruppo puoi inserire ed eliminare oggetti liberamente fino ad una settimana prima della chiusura dell'ordine. 
  
  <br /><br /> In quest'ultima settimana sarà possibile solo rimuovere oggetti o confermare e saldare l'ordine stesso. 
  <br /> gli oggetti non confermati saranno automaticamente rimossi dall'ordine all'evasione dello stesso, di solito il giorno dopo alla conclusione. 
  
  <br /><br /> Tutti gli oggetti inseriti sono arrotondati alla cifra piena più vicina per facilitare le transazioni <br />(per esempio. €33.15 diventa €33; €10.95 diventa €11).`;

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService
  ) {
    this.emitGetCurrentOrder().subscribe();
  }

  isLastOrderWeek(dueDate: Date) {
    const today = new Date();
    return differenceInDays(new Date(dueDate), today) < 7;
  }

  //a function to edit the quantity of an item
  public editQuantity(itemId: string, itemQuantity: number) {
    this.loading = true;
    this.ordersService
      .editItem(itemId, { itemQuantity })
      .pipe(
        tap(() => this.toastrService.success('Quantità aggiornata')),
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() => (this.loading = false)),
        catchError((err) => {
          this.toastrService.error(err.error.errors[0].message);
          this.loading = false;
          return this.ordersService.getCurrentOrder();
        })
      )
      .subscribe();
  }

  public removeItem(itemId: string) {
    this.loading = true;
    this.ordersService
      .removeItem(itemId)
      .pipe(
        tap(() => this.toastrService.success('Oggetto rimosso')),
        switchMap(() => this.emitGetCurrentOrder()),
        tap(() => (this.loading = false)),
        catchError((err) => {
          this.toastrService.error(err.error.errors[0].message);
          this.loading = false;
          return of();
        })
      )
      .subscribe();
  }

  public emitGetCurrentOrder() {
    return this.ordersService.getCurrentOrder().pipe(
      tap((i) => console.log('get current')),
      tap((i) => this.currentOrderSubj$.next(i))
    );
  }

  public hideCardItems(
    item: GroupOrder['items'][0]
  ): ('removeItem' | 'checked')[] {
    switch (item.itemStatus) {
      case 'pending-confirmation': {
        return ['checked'];
      }
      case 'cancelled': {
        return ['checked'];
      }
      default: {
        return ['removeItem', 'checked'];
      }
    }
  }
}
