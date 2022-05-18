import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss'],
})
export class CurrentOrderComponent implements OnInit {
  public currentOrder$: Observable<GroupOrder | null> =
    this.ordersService.ordersSubject$;

  public orderInstructionsBody = `Durante il periodo di un ordine di gruppo puoi inserire ed eliminare oggetti liberamente fino ad una settimana prima della chiusura dell'ordine. 
  
  <br /><br /> In quest'ultima settimana sarà possibile solo rimuovere oggetti o confermare e saldare l'ordine stesso. 
  <br /> gli oggetti non confermati saranno automaticamente rimossi dall'ordine all'evasione dello stesso, di solito il giorno dopo alla conclusione. 
  
  <br /><br /> Tutti gli oggetti inseriti sono arrotondati alla cifra piena più vicina per facilitare le transazioni <br />(per esempio. €33.15 diventa €33; €10.95 diventa €11).`;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {}
}
