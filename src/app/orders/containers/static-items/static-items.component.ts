import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, Subject, switchMap, tap } from 'rxjs';
import { StaticItem } from 'src/app/models/static-item';
import { SvgEnum } from 'src/app/models/svg.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-static-items',
  templateUrl: './static-items.component.html',
  styleUrls: ['./static-items.component.scss'],
})
export class StaticItemsComponent {
  public currentCrumbSvg = SvgEnum.adjustments;
  public loading = false;

  private _staticItemsSubject$ = new Subject<StaticItem[]>();
  public staticItems$: Observable<StaticItem[]> = this._staticItemsSubject$;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {
    this.assignStaticItems().subscribe();
  }

  public toggleStaticItem(itemId: string, isActive: boolean) {
    this.loading = false;
    this.ordersService
      .editStaticItem(itemId, {
        isActive: !isActive,
      })
      .pipe(
        switchMap(() => this.assignStaticItems()),
        tap(() => (this.loading = false)),
        catchError(async (err) =>
          this.toastr.error(err.error.errors[0].message)
        )
      )
      .subscribe();
  }

  public assignStaticItems(): Observable<StaticItem[]> {
    return this.ordersService
      .getStaticItems()
      .pipe(tap((items) => this._staticItemsSubject$.next(items)));
  }
}
