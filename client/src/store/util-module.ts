import { UtilService } from '../services/util-service';

const utilService = new UtilService();

const currency: any = [];
const timezone: any = [];
const category: any = [];
export const util = {
  namespaced: true,
  state: {
    currency,
    timezone,
    category,
  },
  actions: {
    getCurrencyList(context: any) {
      utilService
        .getCurrencyList()
        .then((result: any) => {
          if (result.success) {
            context.commit('getCurrencyList', result.result);
          } else {
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    getTimezoneList(context: any) {
      utilService
        .getTimezoneList()
        .then((result: any) => {
          if (result.success) {
            context.commit('getTimezoneList', result.result);
          } else {
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    getCategoryList(context: any) {
      utilService
        .getCategoryList()
        .then((result: any) => {
          if (result.success) {
            context.commit('getCategoryList', result.result);
          } else {
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
  },
  mutations: {
    getCurrencyList(state: any, payload: any) {
      state.currency = payload;
    },
    getTimezoneList(state: any, payload: any) {
      state.timezone = payload;
    },
    getCategoryList(state: any, payload: any) {
      state.category = payload;
    },
  },
};
