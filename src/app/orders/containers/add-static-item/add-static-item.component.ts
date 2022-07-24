import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { StaticItem } from 'src/app/models/static-item';
import { SvgEnum } from 'src/app/models/svg.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-add-static-item',
  templateUrl: './add-static-item.component.html',
  styleUrls: ['./add-static-item.component.scss'],
})
export class AddStaticItemComponent {
  public currentCrumbSvg = SvgEnum.add;
  public loading = false;

  public item!: {
    itemUrl: string;
    itemPrice: number;
    itemName: string;
    imgSrc: string;
  };
  public itemURL: string = '';

  public isInvalid = false;
  public invalidMessage = '';

  constructor(
    private ordersService: OrdersService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  validateURL(url: string) {
    const isUrl =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
        url
      );

    if (!isUrl) {
      this.isInvalid = true;
      this.invalidMessage = 'URL non valido';
      return;
    }

    this.isInvalid = false;
    return;
  }

  getItemData() {
    this.loading = true;
    this.ordersService
      .getItemData(this.itemURL)
      .pipe(
        tap((value) => {
          console.log(value);
          this.item = {
            itemUrl: this.itemURL,
            itemPrice: value.price,
            itemName: value.name,
            imgSrc: value.imgSrc,
          };
          this.loading = false;
        }),
        catchError(async (err) => {
          this.loading = false;
          console.log(err);
          this.toastrService.error(err.message);
        })
      )
      .subscribe();
  }

  handleSubmit(form: Partial<StaticItem>) {
    this.loading = true;
    this.ordersService
      .addStaticItem(form)
      .pipe(
        tap((value) => {
          console.log(value);
          this.loading = false;
          this.toastrService.success('Articolo aggiunto');
          this.router.navigate(['/orders/items/static']);
        }),
        catchError(async (err) => {
          this.loading = false;
          console.log(err);
          this.toastrService.error(err.message);
        })
      )
      .subscribe();
  }
}
