import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGood } from '@app/core/models/good.model';
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
  @Input() promoGoods?: IGood[];

  config: SwiperOptions = MAIN_SLIDER_CONFIG;
}
