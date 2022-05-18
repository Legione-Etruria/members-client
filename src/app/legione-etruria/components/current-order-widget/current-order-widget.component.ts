import { Component, Input, OnInit } from '@angular/core';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-current-order-widget',
  templateUrl: './current-order-widget.component.html',
  styleUrls: ['./current-order-widget.component.scss'],
})
export class CurrentOrderWidgetComponent implements OnInit {
  @Input() currentOrder?: GroupOrder | null = undefined;

  constructor() {}

  ngOnInit(): void {}
}
