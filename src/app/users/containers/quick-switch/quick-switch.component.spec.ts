import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSwitchComponent } from './quick-switch.component';

describe('QuickSwitchComponent', () => {
  let component: QuickSwitchComponent;
  let fixture: ComponentFixture<QuickSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
