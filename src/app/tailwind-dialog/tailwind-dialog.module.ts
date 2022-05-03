import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TailwindDialogConfirmComponent } from './components/tailwind-dialog-confirm/tailwind-dialog-confirm.component';
import { TailwindDialogComponent } from './components/tailwind-dialog/tailwind-dialog.component';
import { TailwindDialogService } from './services/tailwind-dialog.service';
import { TailwindDialogInsertionDirective } from './tailwind-dialog-insertion.directive';

@NgModule({
  declarations: [
    TailwindDialogComponent,
    TailwindDialogInsertionDirective,
    TailwindDialogConfirmComponent,
  ],
  imports: [CommonModule],
  providers: [TailwindDialogService, TailwindDialogConfirmComponent],
})
export class TailwindDialogModule {}
