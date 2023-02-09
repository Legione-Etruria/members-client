import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { StaticItem } from 'src/app/models/static-item';
import { GroupOrder } from '../../../models/group-order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  public latestOrder$ = this.ordersService.ordersSubject$.pipe(
    tap((o) => this.setInitialStaticItems(o?.staticItems || []))
  );
  public staticItems$ = this.ordersService.getStaticItems(true);
  public selectedStaticItems: string[] = [];

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: Partial<GroupOrder>) {
    this.ordersService
      .addOrder(form, this.selectedStaticItems)
      .pipe(
        switchMap(() => this.ordersService.getCurrentOrder()),
        tap(() => {
          this.toastr.success('Ordine Aggiunto');
          this.router.navigate(['/orders/dashboard']);
        }),
        catchError(
          async (err: { error: { errors: { message: string }[] } }) => {
            this.toastr.error(err.error.errors[0].message);
            return err;
          }
        )
      )
      .subscribe();
  }

  public handleSelectStaticItem(item: string) {
    if (this.selectedStaticItems.includes(item)) {
      this.selectedStaticItems = this.selectedStaticItems.filter(
        (i) => i !== item
      );
      return;
    }

    this.selectedStaticItems.push(item);
    return;
  }

  public setInitialStaticItems(items: StaticItem[]) {
    this.selectedStaticItems = items
      .filter((i) => i.isActive === true)
      .map((i) => i._id);
  }
}
