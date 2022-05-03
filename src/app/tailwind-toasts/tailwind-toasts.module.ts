import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { TailwindToastComponent } from './components/tailwind-toast/tailwind-toast.component';
import { TailwindToastIconComponent } from './components/tailwind-toast-icon/tailwind-toast-icon.component';

@NgModule({
  declarations: [TailwindToastComponent, TailwindToastIconComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      toastComponent: TailwindToastComponent,
    }),
  ],
  exports: [TailwindToastComponent],
})
export class TailwindToastsModule {}
