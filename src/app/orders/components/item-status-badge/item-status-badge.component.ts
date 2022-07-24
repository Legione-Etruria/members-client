import { Component, Input, OnInit } from '@angular/core';
import { SvgEnum } from 'src/app/models/svg.enum';
import { OrderItem } from '../../../models/order-item';

@Component({
  selector: 'app-item-status-badge',
  templateUrl: './item-status-badge.component.html',
  styleUrls: ['./item-status-badge.component.scss'],
})
export class ItemStatusBadgeComponent implements OnInit {
  @Input() itemStatus?: OrderItem['itemStatus'];

  public statusEnum = SvgEnum;

  constructor() {}

  ngOnInit(): void {}
}
