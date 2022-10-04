import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/orders/services/orders.service';
import { AuthService } from '../../../auth/services/auth.service';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user$ = this.authService.currentUserSubject;
  public currentOrder$: Observable<GroupOrder | null> =
    this.ordersService.ordersSubject$;

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {}
}
