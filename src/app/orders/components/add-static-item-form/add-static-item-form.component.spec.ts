import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaticItemFormComponent } from './add-static-item-form.component';

describe('AddStaticItemFormComponent', () => {
  let component: AddStaticItemFormComponent;
  let fixture: ComponentFixture<AddStaticItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaticItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaticItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
