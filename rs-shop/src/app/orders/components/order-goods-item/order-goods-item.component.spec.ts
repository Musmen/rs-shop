import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGoodsItemComponent } from './order-goods-item.component';

describe('OrderGoodsItemComponent', () => {
  let component: OrderGoodsItemComponent;
  let fixture: ComponentFixture<OrderGoodsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderGoodsItemComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGoodsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
