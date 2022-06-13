import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrderWidgetComponent } from './current-order-widget.component';

describe('CurrentOrderWidgetComponent', () => {
  let component: CurrentOrderWidgetComponent;
  let fixture: ComponentFixture<CurrentOrderWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentOrderWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOrderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
