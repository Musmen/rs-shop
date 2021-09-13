import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGoods } from '@core/models/goods.model';
import { MAIN_SLIDER_CONFIG } from '@app/main/common/constants';

import SwiperCore, {
  SwiperOptions, Pagination, Autoplay,
} from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSliderComponent {
  @Input() promoGoods?: IGoods[];

  config: SwiperOptions = MAIN_SLIDER_CONFIG;

  constructor(private router: Router) { }

  goToGoodsItemDetailedPage(goodsItem: IGoods): void {
    this.router.navigate(
      ['/', '.', '', goodsItem.id],
      { state: { goodsItem } },
    );
  }
}
