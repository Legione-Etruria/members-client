import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { TailwindDialogInsertionDirective } from '../../tailwind-dialog-insertion.directive';
import { TailwindDialogRef } from '../../tailwind-dialog.ref';

@Component({
  selector: 'golden-tailwind-dialog',
  templateUrl: './tailwind-dialog.component.html',
})
export class TailwindDialogComponent implements AfterViewInit, OnDestroy {
  componentRef!: ComponentRef<any>;
  childComponentType!: Type<any>;

  @ViewChild(TailwindDialogInsertionDirective)
  insertionPoint!: TailwindDialogInsertionDirective;

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.dialogRef.close('escape');
  }

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: TailwindDialogRef
  ) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onCloseClicked(evt: MouseEvent): void {
    this.dialogRef.close('close');
  }

  onOverlayClicked(evt: MouseEvent): void {
    this.dialogRef.close('overlay');
  }

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    // let componentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentType);
  }

  close(value?: any): void {
    this._onClose.next(value);
  }
}
