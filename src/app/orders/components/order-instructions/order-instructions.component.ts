import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-instructions',
  templateUrl: './order-instructions.component.html',
  styleUrls: ['./order-instructions.component.scss'],
})
export class OrderInstructionsComponent implements OnInit {
  @Input() title = '';
  @Input() body = '';

  private localStorageDismiss = 'order.instructions';
  public hasPermanentlyDismissed =
    'true' === localStorage.getItem(this.localStorageDismiss);
  public hasDismissed = false;

  public swap = false;
  constructor() {}

  ngOnInit(): void {}

  permanentlyDismiss() {
    this.hasDismissed = true;
    localStorage.setItem(this.localStorageDismiss, 'true');
  }
}
