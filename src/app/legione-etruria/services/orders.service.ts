import { Injectable } from '@angular/core';
import { ReplaySubject, tap } from 'rxjs';
import { ApiHttpService } from '../../api-http/services/api-http.service';
import { GroupOrder } from '../../models/group-order';

@Injectable()
export class OrdersService {
  public ordersSubject$ = new ReplaySubject<GroupOrder | null>();

  constructor(private apiHttp: ApiHttpService) {
    this.getCurrentOrder().subscribe();
  }

  addOrder(order: Partial<GroupOrder>) {
    return this.apiHttp.post('/api/v1/orders/add', order);
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
}
