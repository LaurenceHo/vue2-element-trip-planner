import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert-module';
import { authentication } from './authentication-module';

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
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    },
    isLoading(state, payload: any) {
      state.isLoading = payload.isLoading;
    },
    setTrips(state, payload: any) {
      state.trips = payload.trips;
    }
  },
  actions: {
    toggleSideBar(context: any) {
      context.commit('toggleSideBar');
    },
    isLoading(context: any, payload: any) {
      context.commit('isLoading', payload);
    },
    setTrips(context: any, payload: any) {
      context.commit('setTrips', payload);
    }
  }
});
