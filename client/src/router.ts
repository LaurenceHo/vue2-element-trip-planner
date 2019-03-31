import * as _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import TripForm from './components/TripForm.vue';
import Layout from './pages/Layout.vue';
import Login from './pages/Login.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/create-trip',
      component: TripForm
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = [ '/login' ];
  const authRequired = !_.includes(publicPages, to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  
  next();
});
