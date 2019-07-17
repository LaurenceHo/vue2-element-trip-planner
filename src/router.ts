import { includes } from 'lodash';
import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import TripList from './components/TripList.vue';
import TripDetailDashboard from './views/TripDetailDashboard.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          component: TripList,
        },
        {
          path: '/trip/:trip_id',
          component: TripDetailDashboard,
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
