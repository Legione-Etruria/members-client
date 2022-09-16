import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GoogleMapComponent } from './google-map/google-map.component';
import { InfoBadgeComponent } from './info-badge/info-badge.component';
import { MximizedLoadingComponent } from './mximized-loading/mximized-loading.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TailwindLoadingComponent } from './tailwind-loading/tailwind-loading.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    TailwindLoadingComponent,
    PageHeaderComponent,
    TableCellComponent,
    HighlightSearchPipe,
    InfoBadgeComponent,
    GoogleMapComponent,
    MximizedLoadingComponent,
    PhonePipe,
    UploadFileComponent,
  ],
  imports: [CommonModule, RouterModule, NgxDropzoneModule],
  exports: [
    TailwindLoadingComponent,
    PageHeaderComponent,
    TableCellComponent,
    HighlightSearchPipe,
    InfoBadgeComponent,
    GoogleMapComponent,
    MximizedLoadingComponent,
    PhonePipe,
    UploadFileComponent,
  ],
})
export class SharedModule {}
