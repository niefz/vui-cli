/**
 * Created by niefz on 2018/8/27.
 */
import 'babel-polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';

import Router from './routers';
import store from './stores';

import { getCookie } from './utils/utils';
import { i18n, loadLanguageAsync } from './i18n';

import './styles/reset.scss';
import './styles/common.scss';

import App from './index.vue';

Vue.use(VueRouter);

const router = new VueRouter(Router);

const locale = getCookie('oam_locale');
const lang = locale && locale.split('-').find((v, i) => i === 0);

loadLanguageAsync(lang);

const app = new Vue({
  el: '.wrapper',
  router,
  i18n,
  store,
  render: h => h(App),
});

export default { app };
