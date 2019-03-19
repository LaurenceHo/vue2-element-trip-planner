import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Home,
      meta: {
        title: 'Dashboard',
      }
    }
  ]
});
