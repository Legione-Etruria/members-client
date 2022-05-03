import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'golden-tailwind-quick-actions',
  templateUrl: './tailwind-quick-actions.component.html',
  styleUrls: ['./tailwind-quick-actions.component.scss'],
})
export class TailwindQuickActionsComponent implements AfterViewInit {
  @ViewChild('contextMenuWrapper')
  cmWrapper!: ElementRef;

  @Input() public options: IAction = { actions: [] };
  @Input() public contextMenuLabel = 'Azioni rapide';
  @Input() public xPos!: number;
  @Input() public yPos!: number;

  loading = true;

  public screenSize: { width: number; height: number } = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  public cmSize: { width: number; height: number } = { width: 0, height: 0 };

  ngAfterViewInit() {
    this.cmSize.width = parseInt(this.cmWrapper.nativeElement?.offsetWidth);

    this.cmSize.height = parseInt(this.cmWrapper.nativeElement?.offsetHeight);

    this.loading = false;
  }
}

interface IAction {
  actions: {
    isDisabled?: boolean;
    label: string;
    routingData: { routerLink?: string; queryParams?: any; href?: string };
    disabled?: boolean;
    svgPath?: string;
  }[];
}
