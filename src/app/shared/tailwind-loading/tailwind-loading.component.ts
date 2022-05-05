import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-tailwind-loading',
  templateUrl: './tailwind-loading.component.html',
  styleUrls: ['./tailwind-loading.component.scss'],
})
export class TailwindLoadingComponent {
  @Input() label = 'caricamento';
}
