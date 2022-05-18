import { Component, Input } from '@angular/core';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-order-status-badge',
  templateUrl: './order-status-badge.component.html',
  styleUrls: ['./order-status-badge.component.scss'],
})
export class OrderStatusBadgeComponent {
  @Input() status?: GroupOrder['orderStatus'];

  constructor() {}
}
