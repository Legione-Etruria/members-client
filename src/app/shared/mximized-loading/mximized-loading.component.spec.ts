import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MximizedLoadingComponent } from './mximized-loading.component';

describe('MximizedLoadingComponent', () => {
  let component: MximizedLoadingComponent;
  let fixture: ComponentFixture<MximizedLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MximizedLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MximizedLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
