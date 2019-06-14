import { ActionTree, Module, MutationTree } from 'vuex';

import { AlertState, RootState } from './types';

export const state: AlertState = {
  type: null,
  message: null,
};

const namespaced = true;

export const actions: ActionTree<AlertState, RootState> = {
  create({ commit }, alert: AlertState) {
    commit('create', alert);
  },
  clear({ commit }: any) {
    commit('clear');
  },
};

export const mutations: MutationTree<AlertState> = {
  create(state: any, alert: AlertState) {
    state.type = alert.type;
    state.message = alert.message;
  },
  clear(state: any) {
    state.type = null;
    state.message = null;
  },
};

export const alert: Module<AlertState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
