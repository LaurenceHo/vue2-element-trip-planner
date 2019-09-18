import { includes } from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('./components/TripList.vue'),
        },
        {
          path: '/trip/:trip_id',
          component: () => import('./views/TripDetailDashboard.vue'),
        },
      ],
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !includes(publicPages, to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});
