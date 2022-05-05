import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Role } from 'src/app/auth/models/role';
import { AccountStatusBadgeComponent } from './account-status-badge.component';

describe('AccountStatusBadgeComponent', () => {
  let component: AccountStatusBadgeComponent;
  let fixture: ComponentFixture<AccountStatusBadgeComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountStatusBadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatusBadgeComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.user = {
      accountVerified: false,
      active: false,
      _id: 'fakeIdtesting',
      email: 'foo@bar.com',
      role: Role.company,
      firstName: 'foo',
      lastName: 'bar',
      birthDate: new Date(),
      emailVerificationToken: '',
      lastActivity: Date.now(),
      company: {
        _id: 'fakeIdtestingCompany',
        companyName: 'foobar',
        plan: { planType: '', planExpDate: new Date() },
        subscriptionCode: '000000',
        customers: [],
        owner: '',
        areRequiredFieldsFilled: false,
        hasPriceList: false,
      },
      customer: { _id: '', user: '' },
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render verified badge', () => {
    if (!component.user) {
      throw new Error('paradox');
    }

    component.user.active = true;
    component.user.accountVerified = true;

    fixture.detectChanges();

    const link: HTMLElement =
      el.nativeElement.querySelector('#active-verified');
    expect(link).toBeTruthy();
  });

  it('should render deactivated badge', () => {
    if (!component.user) {
      throw new Error('paradox');
    }

    component.user.active = false;
    component.user.accountVerified = false;

    const link: HTMLElement = el.nativeElement.querySelector(
      '#not-active-not-verified'
    );
    expect(link).toBeTruthy();
  });

  it('should render not confirmed badge', () => {
    if (!component.user) {
      throw new Error('paradox');
    }

    component.user.active = true;
    component.user.accountVerified = false;
    fixture.detectChanges();

    const link: HTMLElement = el.nativeElement.querySelector(
      '#active-not-verified'
    );
    expect(link).toBeTruthy();
  });
});
