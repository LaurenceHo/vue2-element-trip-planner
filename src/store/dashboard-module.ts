import { ActionTree, Module, MutationTree } from 'vuex';

import { DashboardState, RootState } from './types';

const state: DashboardState = {
  toggle: true,
  edit: {
    isEditMode: false,
    idInEdit: 0,
    component: null,
  },
  openTripForm: false,
  openTripDayForm: false,
  openTripEventForm: false,
  currentMenu: 'current',
  selectedTripDayId: 0,
};

const namespaced = true;

const actions: ActionTree<DashboardState, RootState> = {
  toggleSideBar({ commit }: any) {
    commit('toggleSideBar');
  },
  updateEdit({ commit }, payload: any) {
    commit('updateEdit', payload);
  },
  openTripForm({ commit }, payload: boolean) {
    commit('openTripForm', payload);
  },
  openTripDayForm({ commit }, payload: boolean) {
    commit('openTripDayForm', payload);
  },
  openTripEventForm({ commit }, payload: boolean) {
    commit('openTripEventForm', payload);
  },
  setSideMenu({ commit }, payload: string) {
    commit('setSideMenu', payload);
  },
  updateSelectedTripDayId({ commit }, payload: number) {
    commit('updateSelectedTripDayId', payload);
  },
};

const mutations: MutationTree<DashboardState> = {
  toggleSideBar(state: any) {
    state.toggle = !state.toggle;
  },
  updateEdit(state: any, payload: any) {
    state.edit.isEditMode = payload.isEditMode;
    state.edit.idInEdit = payload.idInEdit;
    state.edit.component = payload.component;
  },
  openTripForm(state: any, payload: boolean) {
    state.openTripForm = payload;
  },
  openTripDayForm(state: any, payload: boolean) {
    state.openTripDayForm = payload;
  },
  openTripEventForm(state: any, payload: boolean) {
    state.openTripEventForm = payload;
  },
  setSideMenu(state: any, payload: string) {
    state.currentMenu = payload;
  },
  updateSelectedTripDayId(state: any, payload: number) {
    state.selectedTripDayId = payload;
  },
};

export const dashboard: Module<DashboardState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
