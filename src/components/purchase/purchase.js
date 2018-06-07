import $ from 'jquery';

import './purchase.scss';

$(() => {
  $('.choose-color span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('.purchase-button').click(() => {
    console.log('buy....');
  });
});
