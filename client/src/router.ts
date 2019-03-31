import * as _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import Layout from './components/Layout.vue';
import SigninPage from './components/SigninPage.vue';
import TripForm from './components/TripForm.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/signin',
      component: SigninPage
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
  const publicPages = [ '/user/signin' ];
  const authRequired = !_.includes(publicPages, to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    return next('/user/signin');
  }
  
  next();
});
