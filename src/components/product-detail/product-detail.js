import $ from 'jquery';

import './product-detail.scss';

$(() => {
  $('.product-nav-item').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    const navType = $(this).data('nav');
    switch (navType) {
      case 'details':
        $('.product-detail').show().siblings().hide();
        break;
      case 'functions':
        $('.product-function').show().siblings().hide();
        break;
    };
  });
});
