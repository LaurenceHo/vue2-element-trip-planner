import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert-module';
import { authentication } from './authentication-module';
import { trip } from './trip-module';

Vue.use(Vuex);

const edit = {
  isEditMode: false,
  idInEdit: 0,
  component: '',
};

export const store = new Vuex.Store({
  state: {
    toggle: true,
    edit,
    openCreateTripDialog: false,
    openCreateTripDayDialog: false,
    openCreateEventDialog: false,
    currentMenu: 'current',
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
    edit(context: any, payload: any) {
      context.commit('edit', payload);
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
    currentMenu(context: any, payload: string) {
      context.commit('currentMenu', payload);
    },
  },
  mutations: {
    toggleSideBar(state: any) {
      state.toggle = !state.toggle;
    },
    edit(state: any, payload: any) {
      state.edit.isEditMode = payload.isEditMode;
      state.edit.idInEdit = payload.idInEdit;
      state.edit.component = payload.component;
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
    currentMenu(state: any, payload: string) {
      state.currentMenu = payload;
    },
  },
});
