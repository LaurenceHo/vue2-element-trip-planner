import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    toggle: true,
    isLoading: false,
    errorMessage: '',
    trips: []
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    },
    isLoading(state, payload: any) {
      state.isLoading = payload.isLoading;
    },
    errorMessage(state, payload: any) {
      state.errorMessage = payload.errorMessage;
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
    errorMessage(context: any, payload: any) {
      context.commit('errorMessage', payload);
    },
    setTrips(context: any, payload: any) {
      context.commit('setTrips', payload);
    }
  }
});
