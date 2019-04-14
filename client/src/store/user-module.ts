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
  action: {
    register(context: any, payload: User) {
      userService.register(payload).then((result: any) => {
        if (result.success) {
          context.dispatch('alert/info', 'Sign up successful, please do sign in.', { root: true });
          router.push('/');
        } else {
          context.dispatch('alert/error', result.error, { root: true });
        }
      });
    },
  },
  mutations: {
    register(state: any) {},
  },
};
