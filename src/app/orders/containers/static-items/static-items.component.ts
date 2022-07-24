import { Component } from '@angular/core';
import { SvgEnum } from 'src/app/models/svg.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-static-items',
  templateUrl: './static-items.component.html',
  styleUrls: ['./static-items.component.scss'],
})
export class StaticItemsComponent {
  public currentCrumbSvg = SvgEnum.adjustments;

  public staticItems$ = this.ordersService.getStaticItems();

  constructor(private ordersService: OrdersService) {}
}
