import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TailwindLoadingComponent } from './tailwind-loading/tailwind-loading.component';

@NgModule({
  declarations: [
    TailwindLoadingComponent,
    PageHeaderComponent,
    TableCellComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [TailwindLoadingComponent, PageHeaderComponent, TableCellComponent],
})
export class SharedModule {}
