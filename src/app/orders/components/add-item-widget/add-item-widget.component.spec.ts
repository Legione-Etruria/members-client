import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemWidgetComponent } from './add-item-widget.component';

describe('AddItemWidgetComponent', () => {
  let component: AddItemWidgetComponent;
  let fixture: ComponentFixture<AddItemWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
