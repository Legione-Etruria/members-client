import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { TailwindDialogComponent } from '../components/tailwind-dialog/tailwind-dialog.component';
import { TailwindDialogConfig } from '../tailwind-dialog.config';
import { TailwindDialogInjector } from '../tailwind-dialog.injector';
import { TailwindDialogRef } from '../tailwind-dialog.ref';

@Injectable()
export class TailwindDialogService {
  dialogComponentRef!: ComponentRef<TailwindDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(
    componentType: Type<any>,
    config: TailwindDialogConfig
  ): TailwindDialogRef {
    const dialogRef = this.appendTailwindDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendTailwindDialogComponentToBody(
    config: TailwindDialogConfig
  ): TailwindDialogRef {
    const map = new WeakMap();
    map.set(TailwindDialogConfig, config);

    const dialogRef = new TailwindDialogRef();
    map.set(TailwindDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      // close the dialog
      this.removeTailwindDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        TailwindDialogComponent
      );

    const componentRef = componentFactory.create(
      new TailwindDialogInjector(this.injector, map)
    );

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeTailwindDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeTailwindDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
