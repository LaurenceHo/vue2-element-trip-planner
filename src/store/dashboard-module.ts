import { ActionTree, Module, MutationTree } from 'vuex';

import { DashboardState, RootState } from './types';

export const state: DashboardState = {
  toggle: true,
  edit: {
    isEditMode: false,
    idInEdit: 0,
    component: null,
  },
  openCreateTripDialog: false,
  openCreateTripDayDialog: false,
  openCreateEventDialog: false,
  currentMenu: 'current',
  selectedTripDayId: 0,
};

const namespaced = true;

export const actions: ActionTree<DashboardState, RootState> = {
  toggleSideBar({ commit }: any) {
    commit('toggleSideBar');
  },
  edit({ commit }, payload: any) {
    commit('edit', payload);
  },
  openCreateTripDialog({ commit }, payload: boolean) {
    commit('openCreateTripDialog', payload);
  },
  openCreateTripDayDialog({ commit }, payload: boolean) {
    commit('openCreateTripDayDialog', payload);
  },
  openCreateEventDialog({ commit }, payload: boolean) {
    commit('openCreateEventDialog', payload);
  },
  currentMenu({ commit }, payload: string) {
    commit('currentMenu', payload);
  },
  selectedTripDayId({ commit }, payload: number) {
    commit('selectedTripDayId', payload);
  },
};

export const mutations: MutationTree<DashboardState> = {
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
  selectedTripDayId(state: any, payload: number) {
    state.selectedTripDayId = payload;
  },
};

export const dashboard: Module<DashboardState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
