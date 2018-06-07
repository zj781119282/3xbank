import $ from 'jquery';
import Swiper from 'swiper';

import './product-preview.scss';

$(() => {
  function changeImageCallback() {
    const src = $(this).find('img').attr('src');
    $('.product-hd-image img').attr('src', src);
    $(this).addClass('active').siblings().removeClass('active');
  }

  const previewListCount = $('.preview-slide').length;
  if (previewListCount > 3) {
    const mySwiper = new Swiper('.preview-list',{
      slidesPerView : 3.5,
      loop: true,
    });
  }

  $('.preview-slide').click(changeImageCallback);
});
