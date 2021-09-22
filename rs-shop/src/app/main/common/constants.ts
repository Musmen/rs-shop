import { SwiperOptions } from 'swiper';

export const MAIN_SLIDER_CONFIG: SwiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
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
  grabCursor: true,
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
