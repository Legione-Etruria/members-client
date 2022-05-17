import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: Partial<GroupOrder>) {
    console.log(form);
    this.ordersService
      .addOrder(form)
      .pipe(
        tap(() => {
          this.toastr.success('Ordine Aggiunto');
          this.router.navigate(['/orders/current']);
        }),
        catchError((err) => {
          this.toastr.error(err.message);
          return err;
        })
      )
      .subscribe();
  }
}
