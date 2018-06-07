import $ from 'jquery'

import './mobile-header.scss'

function showNav() {
  $('.header-button').removeClass('close').addClass('open');
  $('.nav-list').addClass('open');
}

function hideNav() {
  $('.header-button').removeClass('open').addClass('close');
  $('.nav-list').removeClass('open');
}

$('.header-button').click(function() {
  if ($(this).hasClass('close')) {
    showNav();
    return;
  }
  hideNav();
});

$('.nav-list li a').click(hideNav);
