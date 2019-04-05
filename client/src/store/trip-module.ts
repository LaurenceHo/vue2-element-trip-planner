import { Trip } from '../models/trip';
import { TripService } from '../services/trip-service';

const tripService = new TripService();
const trips: Trip[] = [];

export const trip = {
  namespaced: true,
  state: {
    isLoading: false,
    trips
  },
  actions: {
    isLoading(context: any, payload: any) {
      context.commit('isLoading', payload);
    },
    getTrips(context: any, payload: any) {
      context.commit('isLoading', true);
      tripService.getAllTrips(payload)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            context.commit('setTrips', result.result);
          } else {
            context.dispatch('alert/error', result.error, {root: true});
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, {root: true});
        });
    }
  },
  mutations: {
    isLoading(state: any, payload: any) {
      state.isLoading = payload;
    },
    setTrips(state: any, payload: any) {
      state.trips = payload;
    }
  }
};
