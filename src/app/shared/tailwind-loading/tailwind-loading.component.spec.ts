import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindLoadingComponent } from './tailwind-loading.component';

describe('TailwindLoadingComponent', () => {
  let component: TailwindLoadingComponent;
  let fixture: ComponentFixture<TailwindLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailwindLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailwindLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
