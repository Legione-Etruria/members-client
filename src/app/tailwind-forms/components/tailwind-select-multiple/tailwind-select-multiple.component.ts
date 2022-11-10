import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'golden-tailwind-select-multiple',
  templateUrl: './tailwind-select-multiple.component.html',
})
export class TailwindSelectMultipleComponent implements OnInit {
  @Input() public parent!: UntypedFormGroup;
  @Input() public name!: string;
  @Input() public label!: string;
  @Input() public valuePath!: string;
  @Input() public labelPath!: string;
  @Input() public rows: any[] = [];

  public checkboxAll = false;
  public indeterminate = false;
  public searchTerm = '';

  ngOnInit(): void {
    if (!this.valuePath) {
      throw new Error('valuePath is required');
    }
  }

  isChecked(checkboxValue: string) {
    const ids = this.parent.get(this.name)?.value;
    const index = ids.findIndex((id: string) => id === checkboxValue);

    if (index > -1) {
      return true;
    }

    return false;
  }

  toggleAll(rows: any[]) {
    this.checkboxAll = !this.checkboxAll;

    if (this.checkboxAll) {
      const ids = rows.map((row) => this.getRowValue(row, this.valuePath));
      return this.parent.patchValue({ [this.name]: ids });
    }

    return this.parent.patchValue({ [this.name]: [] });
  }

  toggleCustomer(row: any, rows: any[]) {
    const ids = this.parent.get(this.name)?.value;
    const index = ids.findIndex(
      (id: string) => id === this.getRowValue(row, this.valuePath)
    );
    let newIds = [...ids, this.getRowValue(row, this.valuePath)];

    if (index > -1) {
      newIds = ids.filter(
        (id: string) => id !== this.getRowValue(row, this.valuePath)
      );
    }

    if (rows.length === newIds.length) {
      // console.log('all');
      this.checkboxAll = true;
      this.indeterminate = false;
    } else if (newIds.length === 0) {
      // console.log('none');
      this.checkboxAll = false;
      this.indeterminate = false;
    } else {
      // console.log('indeterminate');
      this.checkboxAll = false;
      this.indeterminate = true;
    }

    this.parent.patchValue({ [this.name]: newIds });
  }

  getRowValue(row: any, path: string) {
    return path.split('.').reduce((o, i) => o[i], row);
  }

  getRowLabel(row: any, path: string) {
    return this.getRowValue(row, path);
  }

  filteredRows() {
    return this.rows.filter((i) => {
      const rowValue = this.getRowValue(i, this.valuePath);
      const rowLabel = this.getRowLabel(i, this.labelPath);

      if (!this.searchTerm.length) {
        return true;
      }

      const isInValue = String(rowValue)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const isInLabel = String(rowLabel)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      return isInValue || isInLabel;
    });
  }
}
