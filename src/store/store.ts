import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { alert } from '@/store/alert-module';
import { authentication } from '@/store/authentication-module';
import { dashboard } from '@/store/dashboard-module';
import { trip } from '@/store/trip-module';
import { RootState } from '@/constants/types';

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
