import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularGoodsSliderComponent } from './popular-goods-slider.component';

describe('PopularGoodsSliderComponent', () => {
  let component: PopularGoodsSliderComponent;
  let fixture: ComponentFixture<PopularGoodsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularGoodsSliderComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularGoodsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
