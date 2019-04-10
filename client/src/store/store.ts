import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert-module';
import { authentication } from './authentication-module';
import { trip } from './trip-module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    toggle: true,
    openCreateTripDialog: false,
  },
  modules: {
    alert,
    authentication,
    trip,
  },
  actions: {
    toggleSideBar(context: any) {
      context.commit('toggleSideBar');
    },
    openCreateTripDialog(context: any, payload: boolean) {
      context.commit('openCreateTripDialog', payload);
    },
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    },
    openCreateTripDialog(state: any, payload: boolean) {
      state.openCreateTripDialog = payload;
    },
  },
});
