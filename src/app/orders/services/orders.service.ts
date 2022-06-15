import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, tap } from 'rxjs';
import { ParcelTracker } from 'src/app/models/parcel-tracker';
import { ApiHttpService } from '../../api-http/services/api-http.service';
import { AuthService } from '../../auth/services/auth.service';
import { GroupOrder } from '../../models/group-order';
import { OrderItem } from '../../models/order-item';

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
      ...item,
      itemPrice: item.price,
      itemName: item.name,
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

  getOrder(publicOrderId: string) {
    return this.apiHttp.get<GroupOrder | null>(
      '/api/v1/orders/get?orderId=' + publicOrderId
    );
  }

  getTracker(trackerId: string) {
    return this.apiHttp.get<ParcelTracker>(
      '/api/v1/orders/tracking/get?trackerId=' + trackerId
    );
  }

  editOrder(orderID: string, toEdit: Partial<GroupOrder>) {
    return this.apiHttp.post('/api/v1/orders/edit/' + orderID, toEdit);
  }

  getItemData(url: string) {
    return this.httpClient.get<{ name: string; price: number; imgSrc: string }>(
      'https://scraper.vps.legioneetruria.com/scrape?url=' +
        url +
        '&apikey=3f77f60c-cbfa-4779-aac8-1e36d95f100e'
    );
  }

  editItem(item: string, toEdit: Partial<GroupOrder['items'][0]>) {
    return this.apiHttp.post('/api/v1/orders/items/edit?item=' + item, toEdit);
  }

  removeItem(itemId: string) {
    return this.apiHttp.delete('/api/v1/orders/items/remove?item=' + itemId);
  }

  confirmItems(itemIds: string[], paymentMethod: OrderItem['paymentMethod']) {
    return this.apiHttp.post('/api/v1/orders/items/confirm', {
      itemIds,
      paymentMethod,
    });
  }
}
export interface fetchedItem {
  price?: number;
  name?: string;
  imgSrc?: string;
  itemUrl?: string;
  itemQuantity?: number;
  userId?: string;
  isUnavailable?: boolean;
}
