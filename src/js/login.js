import $ from 'jquery';
import Cookies from 'js-cookie';
import { i18nConfig } from 'i18n/i18n.config';

import './common';
import './../css/login.scss';

$(() => {
  const currentLang = localStorage._lang === 'en-US' ? 'en-US' : 'zh-CN';
  $('#login_account').attr('placeholder', i18nConfig[currentLang]['login']['placeholder_account']);
  $('#login_password').attr('placeholder', i18nConfig[currentLang]['login']['placeholder_password']);

  $('.login-input').focus(() => {
    $('.error-block').hide();
  });

  $('.login-button').click(() => {
    const account = $('#login_account').val();
    const password = $('#login_password').val();
    if (!account || !password) {
      $('.error-block').show();
      return;
    }
    $('.error-block').hide();
    Cookies.set('isLogged', true, { expires: 1 });
    Cookies.set('account', account, { expires: 1 });
    location.href = '/index.html';
  });
});
