import { Component, Input, OnInit } from '@angular/core';
import { StatusSvgEnum } from 'src/app/models/status-svg';
import { OrderItem } from '../../../models/order-item';

@Component({
  selector: 'app-item-status-badge',
  templateUrl: './item-status-badge.component.html',
  styleUrls: ['./item-status-badge.component.scss'],
})
export class ItemStatusBadgeComponent implements OnInit {
  @Input() itemStatus?: OrderItem['itemStatus'];

  public statusEnum = StatusSvgEnum;

  constructor() {}

  ngOnInit(): void {}
}
