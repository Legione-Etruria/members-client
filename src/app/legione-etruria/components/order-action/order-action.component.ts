import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss'],
})
export class OrderActionComponent {
  @Input() currentOrder?: GroupOrder;
  @Input() pendingConfirmation?: 'issued' | 'cancelled';
  @Output() handleAction = new EventEmitter<typeof this.pendingConfirmation>();

  constructor() {}

  onAction() {
    this.handleAction.emit(this.pendingConfirmation);
  }
}
