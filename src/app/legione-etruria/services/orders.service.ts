import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../api-http/services/api-http.service';
import { GroupOrder } from '../../models/group-order';

@Injectable()
export class OrdersService {
  constructor(private apiHttp: ApiHttpService) {}

  addOrder(order: Partial<GroupOrder>) {
    return this.apiHttp.post('/api/v1/orders/add', order);
  }

  getOrders() {
    return this.apiHttp.get<GroupOrder>('/api/v1/orders');
  }

  getCurrentOrder() {
    return this.apiHttp.get<GroupOrder>('/api/v1/orders', {
      params: new HttpParams({ fromObject: { current: true } }),
    });
  }
}
