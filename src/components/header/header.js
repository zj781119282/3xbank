import $ from 'jquery';
import Cookies from 'js-cookie';
import { i18nConfig, switchLanguage } from 'i18n/i18n.config';

import './header.scss';

$(() => {
  function languageSwitchCallback() {
    const key = $(this).data('lang');
    switchLanguage(key);
  }

  function logout() {
    Cookies.remove('isLogged');
    Cookies.remove('account');
    location.reload();
  }

  const currentLang = localStorage._lang === 'en-US' ? 'en-US' : 'zh-CN';
  const currentPathname = location.pathname.split('.')[0].substr(1);
  const account = Cookies.get('account');
  const isLogged = Cookies.get('isLogged');

  if (currentPathname) {
    $('.nav-list').find('.' + currentPathname).addClass('active');
  } else {
    $('.nav-list .index').addClass('active');
  }

  if (account && isLogged) {
    console.log('in....')
    $('.user-name').text(i18nConfig[currentLang]['header']['welcome'] + ' ' + account);
    $('.account').css('display', 'flex');
    $('.login').hide();
  } else {
    $('.account').hide();
  }

  $('nav .nav-button').click(function() {
    if ($('nav .nav-list').hasClass('xs-hide')) {
      $('nav .nav-list').removeClass('xs-hide');
      $(this).addClass('close');
    } else {
      $('nav .nav-list').addClass('xs-hide');
      $(this).removeClass('close');
    }
  });

  $('.language').hover(() => {
    $('.language ul').toggle();
  });

  $('.account').hover(() => {
    $('.account ul').toggle();
  });

  $('.logout').click(logout);
  $('.logout').on('touchend', logout);

  $('.switch-language').click(languageSwitchCallback);
  $('.switch-language').on('touchend', languageSwitchCallback);
});
