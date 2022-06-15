import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackingWidgetComponent } from './add-tracking-widget.component';

describe('AddTrackingWidgetComponent', () => {
  let component: AddTrackingWidgetComponent;
  let fixture: ComponentFixture<AddTrackingWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrackingWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrackingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
