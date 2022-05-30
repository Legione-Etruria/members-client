import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { GroupOrder } from 'src/app/models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  public currentOrder$ = this.ordersService.ordersSubject$;
  public loading = false;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: Partial<GroupOrder>, orderID: string) {
    this.loading = true;

    this.ordersService
      .editOrder(orderID, form)
      .pipe(
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() => {
          this.loading = false;
          this.toastr.success('Ordine Aggiunto');
          this.router.navigate(['/orders/dashboard']);
        }),
        catchError((err) => {
          this.toastr.error(err.message);
          this.loading = false;
          return err;
        })
      )
      .subscribe();
  }
}
