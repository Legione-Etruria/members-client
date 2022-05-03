import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { TailwindQuickActionsComponent } from './components/tailwind-quick-actions/tailwind-quick-actions.component';

@Directive({
  selector: '[appContextMenu]',
})
export class TailwindActionsDirective {
  @Input() appContextMenu!: {
    contextMenuLabel: string;
    actions: {
      label: string;
      svgPath?: string;
      isDisabled?: boolean;
      routingData: { routerLink?: string; queryParams?: any; href?: string };
    }[];
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  activeContextMenu!: ComponentRef<TailwindQuickActionsComponent>;

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:mousedown', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  mousedown2(event: any): void {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      ![
        'contextmenu-wrapper',
        'contextmenu-loop',
        'contextmenu-option',
        'contextmenu-loop-wrapper',
      ].includes(event.target.parentElement?.id)
    ) {
      this.viewContainerRef.clear();
    }
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchend', ['$event'])
  mousedown(event: any): void {
    this.viewContainerRef.clear();
    event.preventDefault();

    const ref = this.viewContainerRef.createComponent(
      TailwindQuickActionsComponent
    );

    this.activeContextMenu = ref;

    ref.instance.yPos = event.pageY;
    ref.instance.xPos = event.pageX;
    ref.instance.contextMenuLabel = this.appContextMenu.contextMenuLabel;
    ref.instance.options = this.appContextMenu;
    this.cdr.detectChanges();
  }
}
