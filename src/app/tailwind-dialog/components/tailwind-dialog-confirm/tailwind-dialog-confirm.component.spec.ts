import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TailwindDialogRef } from 'src/app/tailwind-dialog/tailwind-dialog.ref';
import { TailwindDialogConfig } from '../../tailwind-dialog.config';
import { TailwindDialogModule } from '../../tailwind-dialog.module';
import { TailwindDialogConfirmComponent } from './tailwind-dialog-confirm.component';

describe('TailwindDialogConfirmComponent', () => {
  let component: TailwindDialogConfirmComponent;
  let fixture: ComponentFixture<TailwindDialogConfirmComponent>;
  let el: DebugElement;

  let dialogConfigSpy: jasmine.SpyObj<TailwindDialogConfig>;
  let dialogRefSpy: jasmine.SpyObj<TailwindDialogRef>;
  beforeEach(async () => {
    dialogConfigSpy = jasmine.createSpyObj('TailwindDialogConfig', ['']);
    dialogRefSpy = jasmine.createSpyObj('TailwindDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [TailwindDialogConfirmComponent],
      providers: [
        {
          provide: TailwindDialogConfig,
          useValue: dialogConfigSpy,
        },
        { provide: TailwindDialogRef, useValue: dialogRefSpy },
      ],
      imports: [TailwindDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    dialogConfigSpy.data = {
      data: {
        title: 'title',
        description: 'description',
        actionButton: { label: 'actionButton' },
        cancelButton: { label: 'cancelButton' },
      },
    };

    fixture = TestBed.createComponent(TailwindDialogConfirmComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create with custom data', () => {
    expect(component).toBeTruthy();
  });

  it('shuld create with default data', () => {
    dialogConfigSpy.data = {};
    fixture.detectChanges();

    component.ngOnInit();

    expect(component).toBeTruthy();
    const wrapper = el.nativeElement.querySelector('#button-wrapper');
    expect(wrapper.textContent).toEqual(
      ' Default action label  Default cancel label '
    );
  });
  it('should close and return action', () => {
    component.onAction();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('action');
  });

  it('should close and return cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('cancel');
  });
});
