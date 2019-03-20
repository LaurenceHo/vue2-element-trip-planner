import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    toggle: false
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
