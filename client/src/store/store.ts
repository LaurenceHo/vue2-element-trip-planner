import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert-module';
import { authentication } from './authentication-module';
import { trip } from './trip-module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    toggle: true,
    isLoading: false,
    trips: []
  },
  modules: {
    alert,
    authentication,
    trip
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    }
  },
  actions: {
    toggleSideBar(context: any) {
      context.commit('toggleSideBar');
    }
  }
});
