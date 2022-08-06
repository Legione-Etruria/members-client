import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticItemCardComponent } from './static-item-card.component';

describe('StaticItemCardComponent', () => {
  let component: StaticItemCardComponent;
  let fixture: ComponentFixture<StaticItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
