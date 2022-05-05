import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() headerText = '';
  @Input() buttons: { label: string; routerLink: string; hidden?: boolean }[] =
    [];
}
