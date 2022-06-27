import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-tracking-widget',
  templateUrl: './add-tracking-widget.component.html',
  styleUrls: ['./add-tracking-widget.component.scss'],
})
export class AddTrackingWidgetComponent implements OnInit {
  @Input() carriers: { name: string; code: string; country: string }[] = [];
  @Output() TNConfirm = new EventEmitter<{
    trackingNumber: string;
    carrier: string;
  }>();

  public showDropdown = false;
  public inputDropdown = '';
  public trackingNumber = '';

  public selectedCarrier?: typeof this.carriers[0];

  constructor() {}

  ngOnInit(): void {}

  public emitTrackingNumber() {
    if (!this.selectedCarrier || !this.trackingNumber) {
      console.log('missing values');
      console.log('selected carrier', this.selectedCarrier);
      console.log('tracking number', this.trackingNumber);
      return;
    }

    this.TNConfirm.emit({
      trackingNumber: this.trackingNumber,
      carrier: this.selectedCarrier.code,
    });

    this.trackingNumber = '';
    this.selectedCarrier = undefined;
  }

  public filterUsers() {
    return this.carriers.filter((i) => {
      const array = [i.name.toLowerCase(), i.country.toLowerCase()];

      return (
        array.some((i) =>
          i?.toLowerCase().includes(this.inputDropdown.toLowerCase())
        ) || this.inputDropdown === ''
      );
    });
  }
}
