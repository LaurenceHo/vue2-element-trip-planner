import * as _ from 'lodash';
import * as moment from 'moment';
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
    isLoading(context: any, payload: boolean) {
      context.commit('isLoading', payload);
    },
    getTrips(context: any, payload: any) {
      context.commit('isLoading', true);
      tripService.getTrips(payload)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            context.commit('getTrips', result.result);
          } else {
            context.dispatch('alert/error', result.error, {root: true});
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, {root: true});
        });
    },
    createTrip(context: any, payload: Trip) {
      context.commit('isLoading', true);
      payload.start_date = moment(payload.start_date).format('YYYY-MM-DD');
      payload.end_date = moment(payload.end_date).format('YYYY-MM-DD');
      tripService.createTrip(payload)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            payload.id = result.result.trip_id;
            context.commit('createTrip', payload);
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
    isLoading(state: any, payload: boolean) {
      state.isLoading = payload;
    },
    getTrips(state: any, payload: Trip[]) {
      _.map(payload, (trip: Trip) => {
        trip.start_date = moment(trip.start_date).format('YYYY-MM-DD');
        trip.end_date = moment(trip.end_date).format('YYYY-MM-DD');
        return trip;
      });
      state.trips = payload;
    },
    createTrip(state: any, payload: Trip) {
      state.trips.push(payload);
    }
  }
};
