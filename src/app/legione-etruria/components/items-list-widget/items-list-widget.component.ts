import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-items-list-widget',
  templateUrl: './items-list-widget.component.html',
  styleUrls: ['./items-list-widget.component.scss'],
})
export class ItemsListWidgetComponent implements OnInit {
  @Input() orderItems: OrderItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
