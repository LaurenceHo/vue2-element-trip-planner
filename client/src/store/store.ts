import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert-module';
import { authentication } from './authentication-module';
import { trip } from './trip-module';
import { user } from './user-module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    toggle: true,
    openCreateTripDialog: false,
    openCreateTripDayDialog: false,
    openTripDetail: false,
  },
  modules: {
    alert,
    authentication,
    user,
    trip,
  },
  actions: {
    toggleSideBar(context: any) {
      context.commit('toggleSideBar');
    },
    openCreateTripDialog(context: any, payload: boolean) {
      context.commit('openCreateTripDialog', payload);
    },
    openCreateTripDayDialog(context: any, payload: boolean) {
      context.commit('openCreateTripDayDialog', payload);
    },
    openTripDetail(context: any, payload: boolean) {
      context.commit('openTripDetail', payload);
    },
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    },
    openCreateTripDialog(state: any, payload: boolean) {
      state.openCreateTripDialog = payload;
    },
    openCreateTripDayDialog(state: any, payload: boolean) {
      state.openCreateTripDayDialog = payload;
    },
    openTripDetail(state: any, payload: boolean) {
      state.openTripDetail = payload;
    },
  },
});
