import { Component, OnInit } from '@angular/core';
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
    dueDate: new Date(),
    items: [],
    shops: ['ilsemaforo', 'taiwangun'],
    issuedBy: '',
    orderStatus: 'pending',
    orderNotes: 'test notes',
    orderPublicId: 'LE9999',
  };

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

  //a function that asks for an OrderItems array and sums all the items quantities
  getTotalQuantity(items: OrderItem[]): number {
    return items.reduce((acc, item) => acc + item.itemQuantity, 0);
  }

  //a function that sums all the items' prices that have an itemstatus of 'pending-payment'
  getPriceToPay(
    items: OrderItem[],
    condition: OrderItem['itemStatus']
  ): number {
    return items.reduce((acc: number, curr) => {
      if (curr.itemStatus === condition) {
        return acc + curr.itemPrice * curr.itemQuantity;
      }

      return acc;
    }, 0);
  }

  //a function that asks for an orderitem array and checks wheter or not at least one item has an itemstatus of 'pending-payment'
  isPaymentPending(items: OrderItem[]): boolean {
    return items.some((item) => item.itemStatus === 'pending-payment');
  }
}
