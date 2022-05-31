import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filters: { label: string; value: string; svgPath: string }[] = [];
  @Output() filterChange = new EventEmitter<string>();

  public showDropdown = false;

  constructor() {}

  emitFilterChange(filter: string) {
    this.filterChange.emit(filter);
  }

  ngOnInit(): void {}
}
