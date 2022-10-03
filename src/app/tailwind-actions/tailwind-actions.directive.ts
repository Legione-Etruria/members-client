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

export interface appContextMenuConfig {
  contextMenuLabel: string;
  actions: {
    label: string;
    svgPath?: string;
    isDisabled?: boolean;
    routingData: { routerLink?: string; queryParams?: any; href?: string };
  }[];
}

@Directive({
  selector: '[appContextMenu]',
})
export class TailwindActionsDirective {
  @Input() appContextMenu!: appContextMenuConfig;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  activeContextMenu!: ComponentRef<TailwindQuickActionsComponent>;

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  mouseup(event: any): void {
    if (
      (!event.target?.__ngContext__?.length ||
        event.target?.__ngContext__[0].localName !==
          'golden-tailwind-quick-actions') &&
      !this.elementRef.nativeElement.contains(event.srcElement) &&
      ![
        'contextmenu-wrapper',
        'contextmenu-label-wrapper',
        'contextmenu-label',
        'contextmenu-loop-wrapper',
        'contextmenu-loop',
        'contextmenu-option',
      ].includes((event.target.parentElement as HTMLElement).id)
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
