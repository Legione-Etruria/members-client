import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTailwindDialogInsertion]',
})
export class TailwindDialogInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
