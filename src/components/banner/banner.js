import $ from 'jquery';
import Swiper from 'swiper';

import './banner.scss';

$(() => {
  const slidesCount = $('.banner-slide').length;
  if (slidesCount > 1) {
    const mySwiper = new Swiper ('.banner-container', {
      loop: true,
      pagination: {
        el: '.banner-pagination',
      },
    });
  }
});
