import { Component, OnInit } from '@angular/core';
import { addDays } from 'date-fns';
import { GroupOrder } from '../../../models/group-order';
import { OrderItem } from '../../../models/order-item';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss'],
})
export class CurrentOrderComponent implements OnInit {
  public currentOrder: GroupOrder = {
    _id: '',
    startDate: new Date(),
    dueDate: addDays(new Date(), 9),
    items: [],
    shops: ['ilsemaforo', 'taiwangun'],
    issuedBy: '',
    orderStatus: 'pending',
    orderNotes:
      'In questo ordine sono abilitati i pallini traccianti, si consiglia a tutti i partecipanti alla gara di acquistartli.',
    orderPublicId: 'LE9999',
  };

  public orderInstructionsBody = `Durante il periodo di un ordine di gruppo puoi inserire ed eliminare oggetti liberamente fino ad una settimana prima della chiusura dell'ordine. 
  
  <br /><br /> In quest'ultima settimana sarà possibile solo rimuovere oggetti o confermare e saldare l'ordine stesso. 
  <br /> gli oggetti non confermati saranno automaticamente rimossi dall'ordine all'evasione dello stesso, di solito il giorno dopo alla conclusione. 
  
  <br /><br /> Tutti gli oggetti inseriti sono arrotondati alla cifra piena più vicina per facilitare le transazioni <br />(per esempio. €33.15 diventa €33; €10.95 diventa €11).`;

  public items: OrderItem[] = [
    {
      order: {} as GroupOrder,
      user: 'a',
      _id: 'a',
      itemUrl:
        'https://www.ilsemaforo-softair.com/it/kit-risparmio-pistole/cyma-g18c-tan-elettrica-gear-box-metal-con-batteria-e-caricatore-p17008',
      itemName: 'G18C TAN ELETTRICA GEAR BOX METAL CON BATTERIA E CARICATORe',
      itemPrice: 82.9,
      itemQuantity: 2,
      imgSrc:
        'https://mediacore.kyuubi.it/ilsemaforo/media/img/2013/11/18/31356-large-cyma-g18c-tan-elettrica-gear-box-metal-con-batteria-e-caricatore.jpg',
      itemStatus: 'pending-confirmation',
    },
    {
      order: {} as GroupOrder,
      user: 'a',
      _id: 'a',
      itemUrl:
        'https://www.taiwangun.com/precision-inner-barrels-vsr-gbb/540mm-6-02-inner-barrel-for-typ-vsr-gbb-maple-leaf',
      itemName: '540MM 6.02 INNER BARREL FOR TYP VSR/GBB [MAPLE LEAF]',
      itemPrice: 33.17,
      itemQuantity: 1,
      imgSrc:
        'https://www.taiwangun.com/img/imagecache/1498001-1499000/b02e9eed3d10382a263f483a56858d47448ef47d.webp',
      itemStatus: 'pending-confirmation',
    },
    {
      order: {} as GroupOrder,
      user: 'a',
      _id: 'a',
      itemUrl:
        'https://www.taiwangun.com/precision-inner-barrels-vsr-gbb/540mm-6-02-inner-barrel-for-typ-vsr-gbb-maple-leaf',
      itemName: '540MM 6.02 INNER BARREL FOR TYP VSR/GBB [MAPLE LEAF]',
      itemPrice: 33.17,
      itemQuantity: 1,
      imgSrc:
        'https://www.taiwangun.com/img/imagecache/1498001-1499000/b02e9eed3d10382a263f483a56858d47448ef47d.webp',
      itemStatus: 'confirmed',
    },
    {
      order: {} as GroupOrder,
      user: 'a',
      _id: 'a',
      itemUrl:
        'https://www.taiwangun.com/precision-inner-barrels-vsr-gbb/540mm-6-02-inner-barrel-for-typ-vsr-gbb-maple-leaf',
      itemName: '540MM 6.02 INNER BARREL FOR TYP VSR/GBB [MAPLE LEAF]',
      itemPrice: 33.17,
      itemQuantity: 1,
      imgSrc:
        'https://www.taiwangun.com/img/imagecache/1498001-1499000/b02e9eed3d10382a263f483a56858d47448ef47d.webp',
      itemStatus: 'cancelled',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
