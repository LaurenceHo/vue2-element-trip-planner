import * as _ from 'lodash';
import * as moment from 'moment';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { TripService } from '../services/trip-service';

const tripService = new TripService();
const trips: Trip[] = [];
const tripDetail: Trip = {
  id: 0,
  user_id: 0,
  start_date: '',
  end_date: '',
  name: '',
  destination: '',
  archived: false,
  trip_day: []
};
const tripDayDetail: TripDay = {
  id: 0,
  trip_id: 0,
  user_id: 0,
  trip_date: '',
  events: []
};

export const trip = {
  namespaced: true,
  state: {
    isLoading: false,
    trip_id: 0,
    trip_day_id: 0,
    trips,
    tripDetail,
    tripDayDetail
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
          if (result.success) {
            context.dispatch('trip/getTrips', {}, {root: true});
          } else {
            context.dispatch('alert/error', result.error, {root: true});
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, {root: true});
        });
    },
    getTripDays(context: any, payload: any) {
      context.commit('isLoading', true);
      tripService.getTripDays(payload.trip_id)
        .then((result: any) => {
          if (result.success) {
            context.commit('getTripDays', result.result);
            if (!payload.isInitial) {
              context.commit('isLoading', false);
            } else {
              if (!_.isEmpty(result.result.trip_day)) {
                context.dispatch('trip/getTripEvents',
                  {trip_id: payload.trip_id, trip_day_id: result.result.trip_day[ 0 ].id},
                  {root: true});
              } else {
                context.commit('getTripEvents', {});
                context.commit('isLoading', false);
              }
            }
          } else {
            context.dispatch('alert/error', result.error, {root: true});
          }
        });
    },
    getTripEvents(context: any, payload: any) {
      context.commit('isLoading', true);
      tripService.getTripEvents(payload.trip_id, payload.trip_day_id)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            context.commit('getTripEvents', result.result);
          } else {
            context.dispatch('alert/error', result.error, {root: true});
          }
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
    getTripDays(state: any, payload: Trip) {
      if (!_.isEmpty(payload.start_date)) {
        payload.start_date = moment(payload.start_date).format('YYYY-MM-DD');
      }
      if (!_.isEmpty(payload.end_date)) {
        payload.end_date = moment(payload.end_date).format('YYYY-MM-DD');
      }
      if (!_.isEmpty(payload.trip_day)) {
        _.map(payload.trip_day, (tripDay: TripDay) => {
          tripDay.trip_date = moment(tripDay.trip_date).format('YYYY-MM-DD');
          return tripDay;
        });
      }
      state.tripDetail = payload;
    },
    getTripEvents(state: any, payload: TripDay) {
      if (!_.isEmpty(payload.events)) {
        _.map(payload.events, (tripEvent: Event) => {
          if (!_.isEmpty(tripEvent.start_time)) {
            tripEvent.start_time = moment(tripEvent.start_time).format('hh:mm');
          }
          if (!_.isEmpty(tripEvent.end_time)) {
            tripEvent.end_time = moment(tripEvent.end_time).format('hh:mm');
          }
          return tripEvent;
        });
      }
      state.tripDayDetail = payload;
    }
  }
};
