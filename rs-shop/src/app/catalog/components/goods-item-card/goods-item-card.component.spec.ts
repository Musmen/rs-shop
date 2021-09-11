import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsItemCardComponent } from './goods-item-card.component';

describe('GoodsItemCardComponent', () => {
  let component: GoodsItemCardComponent;
  let fixture: ComponentFixture<GoodsItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsItemCardComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
