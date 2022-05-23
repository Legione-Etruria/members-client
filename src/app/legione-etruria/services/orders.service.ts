import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, tap } from 'rxjs';
import { ApiHttpService } from '../../api-http/services/api-http.service';
import { AuthService } from '../../auth/services/auth.service';
import { GroupOrder } from '../../models/group-order';

@Injectable()
export class OrdersService {
  public ordersSubject$ = new ReplaySubject<GroupOrder | null>();

  constructor(
    private apiHttp: ApiHttpService,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    if (this.authService.currentUserValue.active) {
      this.getCurrentOrder().subscribe();
    }
  }

  addOrder(order: Partial<GroupOrder>) {
    return this.apiHttp.post('/api/v1/orders/add', order);
  }

  addItem(orderID: string, item: fetchedItem) {
    return this.apiHttp.post('/api/v1/orders/items/add?order=' + orderID, {
      itemUrl: item.itemUrl,
      itemName: item.name,
      itemPrice: item.price,
      imgSrc: item.imgSrc,
      itemQuantity: item.itemQuantity,
    });
  }

  getOrders() {
    return this.apiHttp.get<GroupOrder[]>(
      '/api/v1/orders/get?current=' + false
    );
  }

  getCurrentOrder() {
    return this.apiHttp
      .get<GroupOrder | null>('/api/v1/orders/get?current=' + true)
      .pipe(tap((order) => this.ordersSubject$.next(order)));
  }

  editOrder(toEdit: Partial<GroupOrder> & { orderID: string }) {
    return this.apiHttp.post('/api/v1/orders/edit', toEdit);
  }

  getItemData(url: string) {
    return this.httpClient.get<{ name: string; price: number; imgSrc: string }>(
      'https://scraper.vps.legioneetruria.com/scrape?url=' +
        url +
        '&apikey=3f77f60c-cbfa-4779-aac8-1e36d95f100e'
    );
  }

  removeItem(itemId: string) {
    return this.apiHttp.delete('/api/v1/orders/items/remove?item=' + itemId);
  }
}
interface fetchedItem {
  price?: number;
  name?: string;
  imgSrc?: string;
  itemUrl?: string;
  itemQuantity?: number;
}
