import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  animations: [
    trigger('animateDestroy', [
      state('void', style({ opacity: '0' })),
      transition('* => void', animate('500ms ease')),
    ]),
  ],
  selector: 'app-mximized-loading',
  templateUrl: './mximized-loading.component.html',
  styleUrls: ['./mximized-loading.component.scss'],
})
export class MximizedLoadingComponent implements OnInit {
  @Input() showComponent = true;
  constructor() {}

  ngOnInit(): void {}
}
