import $ from 'jquery';
import header_en from './en-US/header';
import header_cn from './zh-CN/header';
import index_en from './en-US/index';
import index_cn from './zh-CN/index';
import product_en from './en-US/product';
import product_cn from './zh-CN/product';
import login_en from './en-US/login';
import login_cn from './zh-CN/login';
import register_en from './en-US/register';
import register_cn from './zh-CN/register';
import forget_password_en from './en-US/forget_password';
import forget_password_cn from './zh-CN/forget_password';

const i18nConfig = {
  'en-US': {
    header: header_en,
    index: index_en,
    product: product_en,
    login: login_en,
    register: register_en,
    forget_password: forget_password_en,
  },
  'zh-CN': {
    header: header_cn,
    index: index_cn,
    product: product_cn,
    login: login_cn,
    register: register_cn,
    forget_password: forget_password_cn,
  },
};

function switchLanguage(key) {
  localStorage.setItem('_lang', key);
  location.reload();
};

function showTranslations() {
  const currentLang = localStorage._lang === 'en-US' ? 'en-US' : 'zh-CN';
  const i18n = i18nConfig[currentLang];

  $('.language-list').text(currentLang === 'en-US' ? '简体中文' : 'English');

  $('.i18n').each((i, item) => {
    let str = '';
    const data = $(item).data('i18n').split('.');
    $(item).text(i18n[data[0]][data[1]]);
  });
}

export { i18nConfig, showTranslations, switchLanguage };
