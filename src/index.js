import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import App from './index.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

const app = new Vue({
  el: '.wrapper',
  render: h => h(App),
});

export default { app };
