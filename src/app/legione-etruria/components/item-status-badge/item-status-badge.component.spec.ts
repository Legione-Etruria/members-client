import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatusBadgeComponent } from './item-status-badge.component';

describe('ItemStatusBadgeComponent', () => {
  let component: ItemStatusBadgeComponent;
  let fixture: ComponentFixture<ItemStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStatusBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
