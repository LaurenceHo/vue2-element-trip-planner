import { map, isEmpty } from 'lodash';
import * as moment from 'moment';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { TripService } from '../services/trip-service';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

const tripService = new TripService();
const tripList: Trip[] = [];
const tripDetail: Trip = {
  id: 0,
  user_id: 0,
  timezone_id: 0,
  start_date: '',
  end_date: '',
  name: '',
  destination: '',
  archived: false,
  trip_day: [],
};

export const trip = {
  namespaced: true,
  state: {
    isLoading: false,
    tripList,
    tripDetail,
  },
  actions: {
    isLoading(context: any, payload: boolean) {
      context.dispatch('alert/clear', null, { root: true });
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
    getTripDetail(context: any, tripId: number) {
      context.commit('isLoading', true);
      tripService
        .getTripDetail(tripId)
        .then((result: any) => {
          context.commit('isLoading', false);
          if (result.success) {
            context.commit('getTripDetail', result.result);
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
      Object.keys(payload).forEach(prop => {
        if (isEmpty(payload[prop]) || payload[prop] === 0) {
          delete payload[prop];
        }
      });
      payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
      tripService
        .createTrip(payload)
        .then((result: any) => {
          if (result.success) {
            context.dispatch('trip/getTripList', {}, { root: true });
          } else {
            context.commit('isLoading', false);
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    createTripDay(context: any, payload: TripDay) {
      context.commit('isLoading', true);
      payload.trip_date = moment(payload.trip_date).format(DATE_FORMAT);
      tripService
        .createTripDay(payload)
        .then((result: any) => {
          if (result.success) {
            context.dispatch('trip/getTripDetail', payload.trip_id, { root: true });
          } else {
            context.commit('isLoading', false);
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    createTripEvent(context: any, payload: Event) {
      Object.keys(payload).forEach(prop => {
        if (isEmpty(payload[prop]) || payload[prop] === 0) {
          delete payload[prop];
        }
      });
      context.commit('isLoading', true);
      if (payload.start_time) {
        payload.start_time = moment(payload.start_time).format(DATE_TIME_FORMAT);
      }
      if (payload.end_time) {
        payload.end_time = moment(payload.end_time).format(DATE_TIME_FORMAT);
      }
      tripService
        .createTripEvent(context.state.tripDetail.id, payload)
        .then((result: any) => {
          if (result.success) {
            context.dispatch(
              'trip/getTripDayWithEvents',
              { trip_id: context.state.tripDetail.id, trip_day_id: payload.trip_day_id },
              { root: true }
            );
          } else {
            context.commit('isLoading', false);
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    updateTrip(context: any, payload: Trip) {
      context.commit('isLoading', true);
      payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      payload.end_date = moment(payload.end_date).format(DATE_FORMAT);

      tripService
        .updateTrip(payload)
        .then((result: any) => {
          if (result.success) {
            context.commit('isLoading', false);
            context.commit('updateTrip', payload);
          } else {
            context.commit('isLoading', false);
            context.dispatch('alert/error', result.error, { root: true });
          }
        })
        .catch((error: any) => {
          context.commit('isLoading', false);
          context.dispatch('alert/error', error.error, { root: true });
        });
    },
    updateTripEvent(context: any, payload: Event) {
      context.commit('isLoading', true);
      if (payload.start_time) {
        payload.start_time = moment(payload.start_time).format(DATE_TIME_FORMAT);
      }
      if (payload.end_time) {
        payload.end_time = moment(payload.end_time).format(DATE_TIME_FORMAT);
      }
      tripService
        .updateTripEvent(context.state.tripDetail.id, payload)
        .then((result: any) => {
          if (result.success) {
            context.dispatch(
              'trip/getTripDayWithEvents',
              { trip_id: context.state.tripDetail.id, trip_day_id: payload.trip_day_id },
              { root: true }
            );
          } else {
            context.commit('isLoading', false);
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
    getTripDetail(state: any, payload: any) {
      if (payload) {
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
        payload.archived = payload.archived === 1;
      }
      state.tripDetail = payload;
    },
    updateTrip(state: any, payload: Trip) {
      state.tripDetail.destination = payload.destination;
      state.tripDetail.name = payload.name;
      state.tripDetail.start_date = payload.start_date;
      state.tripDetail.end_date = payload.end_date;
      state.tripDetail.archived = payload.archived;
      state.tripDetail.timezone_id = payload.timezone_id;
    },
  },
};
