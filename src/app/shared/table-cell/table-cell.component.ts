import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-table-cell',
  templateUrl: './table-cell.component.html',
})
export class TableCellComponent {
  @Input() label: string | number | null = '/';
  @Input() textColor = 'gray';
}
