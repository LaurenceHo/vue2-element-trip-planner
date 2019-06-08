export const alert = {
  namespaced: true,
  state: {
    type: '',
    message: '',
  },
  actions: {
    success(context: any, message: any) {
      context.commit('success', message);
    },
    error(context: any, message: any) {
      context.commit('error', message);
    },
    info(context: any, message: any) {
      context.commit('info', message);
    },
    clear(context: any) {
      context.commit('clear');
    },
  },
  mutations: {
    success(state: any, message: any) {
      state.type = 'success';
      state.message = message;
    },
    error(state: any, message: any) {
      state.type = 'error';
      state.message = message;
    },
    info(state: any, message: any) {
      state.type = 'info';
      state.message = message;
    },
    clear(state: any) {
      state.type = null;
      state.message = null;
    },
  },
};
