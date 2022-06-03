import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  public order$ = this.ordersService.ordersSubject$.pipe(
    tap(() => (this.loading = false))
  );

  public loading = true;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {}
}
