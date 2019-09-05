import Vue from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import store from '@/store/store';
import '@/style/style.css';
import '@/plugins/element';
import '@/plugins/fontawesome';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
