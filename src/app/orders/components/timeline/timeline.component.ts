import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() steps: { date: string; title: string; description: string }[] = [];
  @Output() stepClicked = new EventEmitter<number>();
}
