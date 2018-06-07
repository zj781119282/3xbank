import $ from 'jquery';
import { i18nConfig } from 'i18n/i18n.config';

import './common';
import './../css/forget_password.scss';

$(() => {
  function errorBlockMessage(key) {
    const message = i18nConfig[currentLang]['register'][`error_${key}`];
    $('.error-block').text(message).show();
  }

  const currentLang = localStorage._lang === 'en-US' ? 'en-US' : 'zh-CN';
  $('#register_account').attr('placeholder', i18nConfig[currentLang]['register']['placeholder_phone']);
  $('#register_captcha').attr('placeholder', i18nConfig[currentLang]['register']['placeholder_captcha']);
  $('#register_ems').attr('placeholder', i18nConfig[currentLang]['register']['placeholder_ems']);
  $('#register_password').attr('placeholder', i18nConfig[currentLang]['register']['placeholder_password']);
  $('#register_repassword').attr('placeholder', i18nConfig[currentLang]['register']['placeholder_repassword']);

  $('.register-input').focus(() => {
    $('.error-block').hide();
  });

  $('.register-button').click(() => {
    const account = $('#register_account').val();
    const captcha = $('#register_captcha').val();
    const ems = $('#register_ems').val();
    const password = $('#register_password').val();
    const repassword = $('#register_repassword').val();
    if (!account) {
      errorBlockMessage('phone');
      return;
    }
    if (!captcha) {
      errorBlockMessage('captcha');
      return;
    }
    if (!ems) {
      errorBlockMessage('ems');
      return;
    }
    if (!password) {
      errorBlockMessage('password');
      return;
    }
    if (!repassword || password !== repassword) {
      errorBlockMessage('repassword');
      return;
    }
    $('.error-block').hide();
    location.href = '/login.html';
  });
});
