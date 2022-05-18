import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.scss'],
})
export class OrdersDashboardComponent implements OnInit {
  public currentOrder$: Observable<GroupOrder | null> =
    this.ordersService.ordersSubject$;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {}
}
