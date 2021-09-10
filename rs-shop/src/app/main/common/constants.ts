import { SwiperOptions } from 'swiper';

export const MAIN_SLIDER_CONFIG: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  // centeredSlides: true,
};
