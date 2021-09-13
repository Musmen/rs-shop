import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsItemPageComponent } from './goods-item-page.component';

describe('GoodsItemPageComponent', () => {
  let component: GoodsItemPageComponent;
  let fixture: ComponentFixture<GoodsItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsItemPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
