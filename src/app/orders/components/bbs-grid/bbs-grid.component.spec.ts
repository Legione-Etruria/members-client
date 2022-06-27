import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbsGridComponent } from './bbs-grid.component';

describe('BbsGridComponent', () => {
  let component: BbsGridComponent;
  let fixture: ComponentFixture<BbsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
