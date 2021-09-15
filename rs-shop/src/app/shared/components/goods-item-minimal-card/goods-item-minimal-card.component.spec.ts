import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsItemMinimalCardComponent } from './goods-item-minimal-card.component';

describe('SlideComponent', () => {
  let component: GoodsItemMinimalCardComponent;
  let fixture: ComponentFixture<GoodsItemMinimalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsItemMinimalCardComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsItemMinimalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
