import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaticItemComponent } from './add-static-item.component';

describe('AddStaticItemComponent', () => {
  let component: AddStaticItemComponent;
  let fixture: ComponentFixture<AddStaticItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaticItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaticItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
