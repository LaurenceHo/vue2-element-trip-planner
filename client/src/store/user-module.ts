import { User } from '../models/user';
import { UserService } from '../services/user-service';
import { router } from '../router';

const userService = new UserService();

export const user = {
  namespaced: true,
  state: {
    email: '',
    username: '',
    password: '',
  },
  actions: {
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
  mutations: {},
};
