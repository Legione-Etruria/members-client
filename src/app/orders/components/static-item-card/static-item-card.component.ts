import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StaticItem } from 'src/app/models/static-item';

@Component({
  selector: 'app-static-item-card',
  templateUrl: './static-item-card.component.html',
  styleUrls: ['./static-item-card.component.scss'],
})
export class StaticItemCardComponent {
  @Input() item?: StaticItem;
  @Input() cardState: 'selectable' | 'editable' | 'stateless' = 'editable';
  @Input() isSelected = false;
  @Output() hideItem = new EventEmitter<void>();
  @Output() toggleSelected = new EventEmitter<void>();

  public hideItemClicked() {
    this.hideItem.emit();
  }

  public selectItemClicked() {
    this.toggleSelected.emit();
  }
}
