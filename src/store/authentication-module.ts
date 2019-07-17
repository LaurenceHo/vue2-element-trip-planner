import { ActionContext, ActionTree, Module, MutationTree } from 'vuex';

import { AuthenticationState, RootState } from './types';
import { User } from '../models/user';
import { router } from '../router';
import { UserService } from '../services/user-service';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';

const user: User = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user };
export const state: AuthenticationState = initialState;
const namespaced = true;

const userService = new UserService();

export const actions: ActionTree<AuthenticationState, RootState> = {
  login({ dispatch, commit }: ActionContext<AuthenticationState, RootState>, payload: any) {
    userService
      .login(payload)
      .then((result: any) => {
        if (result.success) {
          localStorage.setItem('user', JSON.stringify(result.user));
          commit('loginSuccess', result.user);
          router.push('/');
        } else {
          commit('loginFailure', result);
          dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        commit('loginFailure', error);
        dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  logout({ commit }: ActionContext<AuthenticationState, RootState>) {
    userService.logout();
    commit('logout');
    router.push('/login');
  },
  register({ dispatch }: ActionContext<AuthenticationState, RootState>, payload: User) {
    userService.register(payload).then((result: any) => {
      if (result.success) {
        dispatch(Actions.CREATE_ALERT, { type: 'info', message: Messages.registerSuccess.message }, { root: true });
        setTimeout(() => router.push('/login'), 4000);
      } else {
        dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
      }
    });
  },
};

export const mutations: MutationTree<AuthenticationState> = {
  loginSuccess(state: any, user: User) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state: any) {
    state.status = {
      loggedIn: false,
    };
    state.user = null;
  },
  logout(state: any) {
    state.status = {
      loggedIn: false,
    };
    state.user = null;
  },
};

export const authentication: Module<AuthenticationState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
