import { SwiperOptions } from 'swiper';

const SLIDER_BASE_CONFIG: SwiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  grabCursor: true,
};

export const MAIN_SLIDER_CONFIG: SwiperOptions = {
  ...SLIDER_BASE_CONFIG,
  loop: true,
  pagination: {
    el: '.main-swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
};

export const POPULAR_GOODS_SLIDER_CONFIG: SwiperOptions = {
  ...SLIDER_BASE_CONFIG,
  spaceBetween: 15,
  slidesPerView: 3,
  slidesPerGroup: 3,
  navigation: {
    nextEl: '.popular-goods-swiper-button-next',
    prevEl: '.popular-goods-swiper-button-prev',
  },
  grid: {
    fill: 'row',
    rows: 2,
  },
};
