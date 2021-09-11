import {
  Component, ChangeDetectionStrategy, Input, ViewEncapsulation,
} from '@angular/core';

import { IGoods } from '@core/models/goods.model';
import { POPULAR_GOODS_SLIDER_CONFIG } from '@main/common/constants';

import SwiperCore, {
  SwiperOptions, Pagination, Navigation, Grid,
} from 'swiper';

SwiperCore.use([Pagination, Navigation, Grid]);

@Component({
  selector: 'app-popular-goods-slider',
  templateUrl: './popular-goods-slider.component.html',
  styleUrls: ['./popular-goods-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PopularGoodsSliderComponent {
  @Input() popularGoods?: IGoods[];

  config: SwiperOptions = POPULAR_GOODS_SLIDER_CONFIG;
}
