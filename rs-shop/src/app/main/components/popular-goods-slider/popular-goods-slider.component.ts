import {
  Component, ChangeDetectionStrategy, Input, ViewEncapsulation,
} from '@angular/core';

import { IGood } from '@app/core/models/good.model';
import { POPULAR_GOODS_SLIDER_CONFIG } from '@app/main/common/constants';

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
  @Input() popularGoods?: IGood[];

  config: SwiperOptions = POPULAR_GOODS_SLIDER_CONFIG;
}
