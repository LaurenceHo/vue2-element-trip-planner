import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import TripForm from './components/TripForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard',
      }
    },
    {
      path: '/create-trip',
      name: 'create trip',
      component: TripForm,
      meta: {
        title: 'Create trip',
      }
    }
  ]
});
