import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TailwindToastIconComponent } from './tailwind-toast-icon.component';

describe('TailwindToastIconComponent', () => {
  let component: TailwindToastIconComponent;
  let fixture: ComponentFixture<TailwindToastIconComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TailwindToastIconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailwindToastIconComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render success icon', () => {
    component.type = 'toast-success';
    fixture.detectChanges();

    const iconElem = el.nativeElement.querySelector('#success');
    expect(iconElem).toBeTruthy();
  });

  it('should render warning icon', () => {
    component.type = 'toast-warning';
    fixture.detectChanges();

    const iconElem = el.nativeElement.querySelector('#warning');
    expect(iconElem).toBeTruthy();
  });

  it('should render error icon', () => {
    component.type = 'toast-error';
    fixture.detectChanges();

    const iconElem = el.nativeElement.querySelector('#error');
    expect(iconElem).toBeTruthy();
  });

  it('should render info icon', () => {
    component.type = 'toast-info';
    fixture.detectChanges();

    const iconElem = el.nativeElement.querySelector('#info');
    expect(iconElem).toBeTruthy();
  });
  it('should not render any icon', () => {
    const switchContainer: HTMLElement =
      el.nativeElement.querySelector('#switch-container');

    expect(switchContainer.children.length).toBeFalsy();
  });
});
