import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() checked = false;
  @Input() label = '!NESSUN LABEL PER QUESTO TOGGLE!';
  @Input() labelDirection = 'right';
  @Output() toggled = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
