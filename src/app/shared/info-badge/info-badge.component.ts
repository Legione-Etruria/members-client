import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-badge',
  templateUrl: './info-badge.component.html',
  styleUrls: ['./info-badge.component.scss'],
})
export class InfoBadgeComponent implements OnInit {
  @Input() options?: { value?: any; svgPath?: string; extraClass?: string };

  constructor() {}

  ngOnInit(): void {}
}
