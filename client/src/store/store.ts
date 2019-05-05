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
    isEditMode: false,
    openCreateTripDialog: false,
    openCreateTripDayDialog: false,
    openCreateEventDialog: false,
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
    isEditMode(context: any, payload: boolean) {
      context.commit('isEditMode', payload);
    },
    openCreateTripDialog(context: any, payload: boolean) {
      context.commit('openCreateTripDialog', payload);
    },
    openCreateTripDayDialog(context: any, payload: boolean) {
      context.commit('openCreateTripDayDialog', payload);
    },
    openCreateEventDialog(context: any, payload: boolean) {
      context.commit('openCreateEventDialog', payload);
    },
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    },
    isEditMode(state: any, payload: boolean) {
      state.isEditMode = payload;
    },
    openCreateTripDialog(state: any, payload: boolean) {
      state.openCreateTripDialog = payload;
    },
    openCreateTripDayDialog(state: any, payload: boolean) {
      state.openCreateTripDayDialog = payload;
    },
    openCreateEventDialog(state: any, payload: boolean) {
      state.openCreateEventDialog = payload;
    },
  },
});
