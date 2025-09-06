import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryUserComponent } from './temporary-user.component';

describe('TemporaryUserComponent', () => {
  let component: TemporaryUserComponent;
  let fixture: ComponentFixture<TemporaryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
