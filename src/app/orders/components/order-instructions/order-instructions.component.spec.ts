import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInstructionsComponent } from './order-instructions.component';

describe('OrderInstructionsComponent', () => {
  let component: OrderInstructionsComponent;
  let fixture: ComponentFixture<OrderInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
