import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { StaticItem } from 'src/app/models/static-item';
import { SvgEnum } from 'src/app/models/svg.enum';
import { IFilter } from '../../components/filter/filter.component';
import { OrdersService } from '../../services/orders.service';

enum StaticItemsStatusLabels {
  Active = 'active',
  NonActive = 'non-active',
}

@Component({
  selector: 'app-static-items',
  templateUrl: './static-items.component.html',
  styleUrls: ['./static-items.component.scss'],
})
export class StaticItemsComponent implements OnInit {
  public currentCrumbSvg = SvgEnum.adjustments;
  public loading = false;
  public searchField = new FormControl('');

  private _staticItemsSubject$ = new Subject<StaticItem[]>();
  public staticItems$: Observable<StaticItem[]> = this._staticItemsSubject$;

  public filteredStaticItems$ = new Observable<StaticItem[]>();

  public quickFilters: IFilter[] = [
    {
      label: 'Nessun filtro',
      value: '',
      svgPath: SvgEnum.emptyCube,
    },
    {
      label: 'Pallini',
      value: 'pallini',
      svgPath: '',
    },
    {
      label: 'Equipaggiamento',
      value: 'equip',
      svgPath: SvgEnum.map,
    },
    {
      label: 'Attivi',
      value: StaticItemsStatusLabels.Active,
      svgPath: SvgEnum.confirmedIn,
    },
    {
      label: 'Disattivi',
      value: StaticItemsStatusLabels.NonActive,
      svgPath: SvgEnum.cancelledIn,
    },
  ];

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {
    this.assignStaticItems().subscribe();
  }

  public ngOnInit(): void {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    this.filteredStaticItems$ = combineLatest([
      this.staticItems$,
      searchTerm$,
    ]).pipe(
      debounceTime(200),
      map(([staticItems, searchTerm]) =>
        staticItems.filter((staticItem) => {
          if (!searchTerm) {
            return true;
          }

          const filters = [
            staticItem.itemName,
            staticItem.itemMeasueUnit,
            staticItem.itemPrice.toFixed(2),
            staticItem.itemType,
            staticItem.itemUrl,
          ];

          if (
            searchTerm === StaticItemsStatusLabels.Active ||
            searchTerm === StaticItemsStatusLabels.NonActive
          ) {
            return staticItem.isActive ===
              (StaticItemsStatusLabels.Active === searchTerm)
              ? true
              : false;
          }

          return filters.some((i) =>
            i?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      )
    );
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

  public filterByActive(staticItems: StaticItem[], isActive: boolean) {
    return staticItems.filter((i) => i.isActive === isActive);
  }
}
