import { User } from '../models/user';
import { router } from '../router';
import { UserService } from '../services/user-service';

const user: User = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user };

const userService = new UserService();

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
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
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('loginFailure', error);
          context.dispatch('alert/error', error.error, { root: true });
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
          context.dispatch('alert/info', 'Sign up successful, will be going to redirect to login page.', {
            root: true,
          });
          setTimeout(() => router.push('/login'), 4000);
        } else {
          context.dispatch('alert/error', result.error, { root: true });
        }
      });
    },
  },
  mutations: {
    loginSuccess(state: any, user: User) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state: any) {
      state.status = {};
      state.user = null;
    },
    logout(state: any) {
      state.status = {};
      state.user = null;
    },
  },
};
