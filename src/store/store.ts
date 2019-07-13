import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { alert } from './alert-module';
import { authentication } from './authentication-module';
import { dashboard } from './dashboard-module';
import { trip } from './trip-module';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    alert,
    dashboard,
    authentication,
    trip,
  },
};
export default new Vuex.Store<RootState>(store);
