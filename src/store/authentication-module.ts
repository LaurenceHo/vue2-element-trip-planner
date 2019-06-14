import { ActionTree, Module, MutationTree } from 'vuex';

import { RootState, AuthenticationState } from './types';
import { User } from '../models/user';
import { router } from '../router';
import { UserService } from '../services/user-service';

const user: User = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user };
export const state: AuthenticationState = initialState;
const namespaced = true;

const userService = new UserService();

export const actions: ActionTree<AuthenticationState, RootState> = {
  login(context: any, payload: any) {
    userService
      .login(payload)
      .then((result: any) => {
        if (result.success) {
          localStorage.setItem('user', JSON.stringify(result.user));
          context.commit('loginSuccess', result.user);
          router.push('/');
        } else {
          context.commit('loginFailure', result);
          context.dispatch('alert/create', { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('loginFailure', error);
        context.dispatch('alert/create', { type: 'error', message: error.error }, { root: true });
      });
  },
  logout(context: any) {
    userService.logout();
    context.commit('logout');
    router.push('/login');
  },
  register(context: any, payload: User) {
    userService.register(payload).then((result: any) => {
      if (result.success) {
        context.dispatch(
          'alert/create',
          { type: 'info', message: 'Sign up successful, will be going to redirect to login page.' },
          { root: true }
        );
        setTimeout(() => router.push('/login'), 4000);
      } else {
        context.dispatch('alert/create', { type: 'error', message: result.error }, { root: true });
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
