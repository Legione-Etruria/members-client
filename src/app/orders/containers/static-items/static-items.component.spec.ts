import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticItemsComponent } from './static-items.component';

describe('StaticItemsComponent', () => {
  let component: StaticItemsComponent;
  let fixture: ComponentFixture<StaticItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
