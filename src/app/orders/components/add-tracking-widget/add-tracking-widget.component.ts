import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-tracking-widget',
  templateUrl: './add-tracking-widget.component.html',
  styleUrls: ['./add-tracking-widget.component.scss'],
})
export class AddTrackingWidgetComponent implements OnInit {
  @Output() TNConfirm = new EventEmitter<string>();

  public trackingNumber = '';

  constructor() {}

  ngOnInit(): void {}
}
