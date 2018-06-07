/**
 * Created by Administrator on 2018/4/12 0012.
 */
import $ from 'jquery';

import 'normalize.css';
import 'animate.css/animate.min.css';
import 'swiper/dist/css/swiper.min.css';

import './../css/global.scss';
import './../css/media-lg.scss';
import './../css/media-xs.scss';

import { showTranslations } from  'i18n/i18n.config';
import 'comp/header/header';
import 'comp/banner/banner';
import 'comp/footer/footer';
import 'comp/product-preview/product-preview';
import 'comp/purchase/purchase';
import 'comp/product-detail/product-detail';


$(() => {
  showTranslations();
});
