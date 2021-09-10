import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGood } from '@app/core/models/good.model';
import { MAIN_SLIDER_CONFIG } from '@app/main/common/constants';

import SwiperCore, {
  SwiperOptions, Pagination, Autoplay,
} from 'swiper'; // Navigation

SwiperCore.use([Pagination, Autoplay]); // Navigation

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSliderComponent {
  @Input() promoGoods?: IGood[];

  config: SwiperOptions = MAIN_SLIDER_CONFIG;

  // swiper?: SwiperCore;

  // onSwiper(swiper: SwiperCore) {
  // this.swiper = swiper.init();
  // debugger;
  // this.swiper.pagination.render();
  // this.swiper.pagination.init();
  // this.swiper.removeAllSlides();
  // this.swiper.appendSlide([
  //   '<ng-template swiperSlide>Slide 1</ng-template>',
  //   '<ng-template swiperSlide>Slide 2</ng-template>',
  //   '<ng-template swiperSlide>Slide 3</ng-template>',
  //   '<ng-template swiperSlide>Slide 4</ng-template>',
  //   '<ng-template swiperSlide>Slide 5</ng-template>',
  // ]);
  // this.swiper.update();
  // this.ref.detectChanges();
  // }

  // onSlideChange() {
  //   console.log('slide change');
  // }
}
