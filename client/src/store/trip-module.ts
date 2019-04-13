import { map, isEmpty } from 'lodash';
import * as moment from 'moment';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { TripService } from '../services/trip-service';

const DATE_FORMAT = 'YYYY-MM-DD';
const tripService = new TripService();
const tripList: Trip[] = [];
const tripDetail: Trip = {
  id: 0,
  user_id: 0,
  start_date: '',
  end_date: '',
  name: '',
  destination: '',
  archived: false,
  trip_day: [],
};
const tripDayDetail: TripDay = {
  id: 0,
  name: '',
  trip_id: 0,
  user_id: 0,
  trip_date: '',
  events: [],
};

export const trip = {
  namespaced: true,
  state: {
    isLoading: false,
    tripList,
    tripDetail,
    tripDayDetail,
  },
  actions: {
    isLoading(context: any, payload: boolean) {
      context.commit('isLoading', payload);
    },
    getTripList(context: any, payload: any) {
      context.commit('isLoading', true);
      tripService
        .getTripList(payload)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            context.commit('getTripList', result.result);
          } else {
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    createTrip(context: any, payload: Trip) {
      context.commit('isLoading', true);
      payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
      tripService
        .createTrip(payload)
        .then((result: any) => {
          if (result.success) {
            context.dispatch('trip/getTripList', {}, { root: true });
          } else {
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    getTripDetailWithDays(context: any, tripId: number) {
      context.commit('isLoading', true);
      tripService
        .getTripDetailWithDays(tripId)
        .then((result: any) => {
          if (result.success) {
            context.commit('getTripDetailWithDays', result.result);
            if (!isEmpty(result.result.trip_day)) {
              context.dispatch(
                'trip/getTripDayWithEvents',
                { trip_id: tripId, trip_day_id: result.result.trip_day[0].id },
                { root: true }
              );
            } else {
              context.commit('getTripDayWithEvents', {});
              context.commit('isLoading', false);
            }
          } else {
            context.commit('getTripDetailWithDays', {});
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    getTripDayWithEvents(context: any, payload: any) {
      context.commit('isLoading', true);
      tripService
        .getTripDayWithEvents(payload.trip_id, payload.trip_day_id)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            context.commit('getTripDayWithEvents', result.result);
          } else {
            context.commit('getTripDayWithEvents', {});
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
  },
  mutations: {
    isLoading(state: any, payload: boolean) {
      state.isLoading = payload;
    },
    getTripList(state: any, payload: Trip[]) {
      map(payload, (trip: Trip) => {
        trip.start_date = moment(trip.start_date).format(DATE_FORMAT);
        trip.end_date = moment(trip.end_date).format(DATE_FORMAT);
        return trip;
      });
      state.tripList = payload;
    },
    getTripDetailWithDays(state: any, payload: Trip) {
      if (!isEmpty(payload.start_date)) {
        payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      }
      if (!isEmpty(payload.end_date)) {
        payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
      }
      if (!isEmpty(payload.trip_day)) {
        map(payload.trip_day, (tripDay: TripDay) => {
          tripDay.trip_date = moment(tripDay.trip_date).format(DATE_FORMAT);
          return tripDay;
        });
      }
      state.tripDetail = payload;
    },
    getTripDayWithEvents(state: any, payload: TripDay) {
      if (!isEmpty(payload.events)) {
        map(payload.events, (tripEvent: Event) => {
          if (!isEmpty(tripEvent.start_time)) {
            tripEvent.start_time = moment(tripEvent.start_time).format('hh:mm');
          }
          if (!isEmpty(tripEvent.end_time)) {
            tripEvent.end_time = moment(tripEvent.end_time).format('hh:mm');
          }
          return tripEvent;
        });
      }
      state.tripDayDetail = payload;
    },
  },
};
