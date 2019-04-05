import * as _ from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Layout from './pages/Layout.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      component: Layout,
      children: [ {
        path: '',
        component: Dashboard,
        meta: [],
      } ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = [ '/login', '/register' ];
  const authRequired = !_.includes(publicPages, to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  
  next();
});
