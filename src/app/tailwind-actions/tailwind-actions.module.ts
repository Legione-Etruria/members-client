import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TailwindQuickActionsComponent } from './components/tailwind-quick-actions/tailwind-quick-actions.component';
import { TailwindActionsDirective } from './tailwind-actions.directive';

@NgModule({
  declarations: [TailwindQuickActionsComponent, TailwindActionsDirective],
  imports: [CommonModule, RouterModule],

  exports: [TailwindQuickActionsComponent, TailwindActionsDirective],
})
export class TailwindActionsModule {}
