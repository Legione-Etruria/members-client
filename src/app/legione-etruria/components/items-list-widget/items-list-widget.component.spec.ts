import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListWidgetComponent } from './items-list-widget.component';

describe('ItemsListWidgetComponent', () => {
  let component: ItemsListWidgetComponent;
  let fixture: ComponentFixture<ItemsListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsListWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
