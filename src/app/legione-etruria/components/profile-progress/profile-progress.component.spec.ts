import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Customer } from 'src/app/customers/models/customer';
import { ProfileProgressComponent } from './profile-progress.component';

describe('ProfileProgressComponent', () => {
  let component: ProfileProgressComponent;
  let fixture: ComponentFixture<ProfileProgressComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProgressComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.companyData = {
      _id: 'fakeIdtestingCompany',
      companyName: 'foobar',
      openHours: [
        { name: 'Lunedì', active: true, hours: [{ from: '9', to: '19' }] },
        { name: 'Martedì', active: false, hours: [{ from: '', to: '' }] },
        { name: 'Mercoledì', active: false, hours: [{ from: '', to: '' }] },
        { name: 'Giovedì', active: false, hours: [{ from: '', to: '' }] },
        { name: 'Venerdì', active: true, hours: [{ from: '9', to: '19' }] },
        { name: 'Sabato', active: false, hours: [{ from: '', to: '' }] },
        { name: 'Domenica', active: false, hours: [{ from: '', to: '' }] },
      ],
      plan: { planType: '', planExpDate: new Date() },
      subscriptionCode: '000000',
      customers: [{ customer: {} as Customer, status: 'subscribed' }],
      owner: '',
      areRequiredFieldsFilled: false,
      hasPriceList: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' slabel', () => {
    const doneSoon = el.nativeElement.querySelector('#done-soon');

    expect(doneSoon.textContent).toEqual(
      ' Ti manca poco per completare il profilo '
    );
  });

  describe('STEP 2', () => {
    it('not completed', () => {
      component.companyData = {
        _id: 'fakeIdtestingCompany',
        companyName: 'foobar',
        plan: { planType: '', planExpDate: new Date() },
        subscriptionCode: '000000',
        customers: [{ customer: {} as Customer, status: 'subscribed' }],
        owner: '',
        areRequiredFieldsFilled: false,
        hasPriceList: false,
      };

      component.ngOnInit();
      fixture.detectChanges();
      const step2: HTMLElement = el.nativeElement.querySelector('#step-2');

      expect(step2).toBeTruthy();
      expect(step2.classList.toString().includes('text-gray-500')).toBeTrue();
      expect(step2.classList.toString().includes('text-green-600')).toBeFalse();
      expect(step2.textContent).not.toEqual('Step 2 (completato)');
    });

    it('completed', () => {
      fixture.detectChanges();
      const step2: HTMLElement = el.nativeElement.querySelector('#step-2');

      expect(
        step2.classList.toString().includes('text-green-600')
      ).toBeTruthy();
      expect(step2.textContent).toEqual('Step 2 (completato)');
    });
  });
  describe('STEP 3', () => {
    it('completed', () => {
      component.companyData.hasPriceList = true;

      component.ngOnInit();
      fixture.detectChanges();

      const step3: HTMLElement = el.nativeElement.querySelector('#step-3');

      expect(step3).toBeTruthy();
      expect(
        step3.classList.toString().includes('text-green-600')
      ).toBeTruthy();
      expect(step3.textContent).toEqual('Step 3 (completato)');
    });

    it('not completed', () => {
      component.companyData.hasPriceList = false;
      fixture.detectChanges();

      const step3: HTMLElement = el.nativeElement.querySelector('#step-3');

      expect(step3).toBeTruthy();
      expect(step3.classList.toString().includes('text-gray-500'));
      expect(step3.textContent).not.toEqual('Step 3 (completato)');
    });
  });

  describe('STEP 4', () => {
    it('completed', () => {
      component.companyData.areRequiredFieldsFilled = true;

      component.ngOnInit();
      fixture.detectChanges();

      const step4: HTMLElement = el.nativeElement.querySelector('#step-4');

      expect(step4).toBeTruthy();
      expect(
        step4.classList.toString().includes('text-green-600')
      ).toBeTruthy();
      expect(step4.textContent).toEqual('Step 4 (completato)');
    });

    it('not completed', () => {
      component.companyData.areRequiredFieldsFilled = false;
      fixture.detectChanges();

      const step4: HTMLElement = el.nativeElement.querySelector('#step-4');

      expect(step4).toBeTruthy();
      expect(step4.classList.toString().includes('text-gray-500'));
      expect(step4.textContent).not.toEqual('Step 4 (completato)');
    });
  });

  describe('STEP 5', () => {
    it('completed', () => {
      component.ngOnInit();
      fixture.detectChanges();

      const step5: HTMLElement = el.nativeElement.querySelector('#step-5');

      expect(step5).toBeTruthy();
      expect(
        step5.classList.toString().includes('text-green-600')
      ).toBeTruthy();
      expect(step5.textContent).toEqual('Step 5 (completato)');
    });

    it('not completed', () => {
      component.companyData.customers = [];
      component.ngOnInit();
      fixture.detectChanges();

      const step5: HTMLElement = el.nativeElement.querySelector('#step-5');

      expect(step5).toBeTruthy();
      expect(step5.classList.toString().includes('text-gray-500'));
      expect(step5.textContent).not.toEqual('Step 5 (completato)');
    });
  });
});
