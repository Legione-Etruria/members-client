import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-tailwind-toast-icon',
  templateUrl: './tailwind-toast-icon.component.html',
})
export class TailwindToastIconComponent {
  @Input() type: string = '';
}
