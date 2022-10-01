import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, tap } from 'rxjs';
import { GroupOrder } from 'src/app/models/group-order';
import { StaticItem } from 'src/app/models/static-item';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  public currentOrder$ = this.ordersService.ordersSubject$.pipe(
    tap((o) => this.setInitialStaticItems(o?.staticItems || []))
  );
  public staticItems$ = this.ordersService.getStaticItems(true);

  public loading = false;
  public selectedStaticItems: string[] = [];

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: Partial<GroupOrder>, orderID: string) {
    this.loading = true;

    form.staticItemsIds = this.selectedStaticItems;

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
