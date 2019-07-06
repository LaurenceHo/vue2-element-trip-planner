import { isEmpty, map } from 'lodash';
import * as moment from 'moment-timezone';
import { ActionTree, Module, MutationTree } from 'vuex';

import { RootState, TripState } from './types';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { EventService } from '../services/event-service';
import { TripService } from '../services/trip-service';
import { DATE_FORMAT, DATE_TIME_FORMAT, DATE_TIME_TZ_FORMAT } from '../constants/general';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';
import { timezone } from '../assets/timezone';

const tripList: Trip[] = [];
const trip_day: TripDay[] = [];
const state: TripState = {
  isLoading: false,
  tripList,
  tripDetail: {
    id: 0,
    timezone_id: 0,
    start_date: '',
    end_date: '',
    name: '',
    destination: '',
    archived: false,
    trip_day,
  },
};
const namespaced = true;
const eventService = new EventService();
const tripService = new TripService();

const _generateGetTripListPayload = (currentMenu: 'archived' | 'current' | 'upcoming' | 'past') => {
  let requestBody = null;
  if (currentMenu === 'archived') {
    requestBody = {
      archived: true,
    };
  } else if (currentMenu === 'current') {
    requestBody = {
      start_date: moment().format(DATE_FORMAT),
      end_date: moment().format(DATE_FORMAT),
      archived: false,
    };
  } else if (currentMenu === 'upcoming') {
    requestBody = {
      start_date: moment().format(DATE_FORMAT),
      archived: false,
    };
  } else if (currentMenu === 'past') {
    requestBody = {
      end_date: moment().format(DATE_FORMAT),
      archived: false,
    };
  } else {
    requestBody = {
      archived: false,
    };
  }
  return requestBody;
};

const _createEventRequestPayload = (payload: Event) => {
  Object.keys(payload).forEach(prop => {
    if (prop === 'start_time_object') {
      if (isEmpty(payload[prop])) {
        payload[prop] = null;
        payload['start_time'] = null;
      }
    } else if (prop === 'end_time_object') {
      if (isEmpty(payload[prop])) {
        payload[prop] = null;
        payload['end_time'] = null;
      }
    } else if (prop === 'currency_id' && payload[prop] === 0) {
      payload[prop] = null;
    } else if (prop === 'start_time_timezone_id' && payload[prop] === 0) {
      payload[prop] = null;
    } else if (prop === 'end_time_timezone_id' && payload[prop] === 0) {
      payload[prop] = null;
    } else if (prop === 'cost' && isEmpty(payload[prop])) {
      payload[prop] = null;
    }
  });
  return payload;
};

const actions: ActionTree<TripState, RootState> = {
  isLoading(context: any, payload: boolean) {
    context.dispatch(Actions.CLEAR_ALERT, null, { root: true });
    context.commit('isLoading', payload);
  },
  getTripList(context: any) {
    context.commit('isLoading', true);
    const requestPayload = _generateGetTripListPayload(context.rootState.dashboard.currentMenu);
    tripService
      .getTripList(requestPayload)
      .then((result: any) => {
        context.commit('isLoading', false);
        if (result.success) {
          context.commit('getTripList', result.result);
        } else {
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  getTripDetail(context: any, payload: { tripId: number; isCreateOrUpdate: boolean }) {
    context.commit('isLoading', true);
    tripService
      .getTripDetail(payload.tripId)
      .then((tripDetailResult: any) => {
        context.commit('isLoading', false);
        if (isEmpty(tripDetailResult)) {
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: Messages.response.message }, { root: true });
        } else {
          if (tripDetailResult.success) {
            context.commit('getTripDetail', tripDetailResult.result);
            if (!payload.isCreateOrUpdate) {
              context.dispatch(Actions.UPDATE_SELECTED_TRIP_DAY_ID, tripDetailResult.result.trip_day[0].id, {
                root: true,
              });
            }
          } else {
            context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: tripDetailResult.error }, { root: true });
          }
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  createTrip(context: any, payload: Trip) {
    context.commit('isLoading', true);
    payload.start_date = moment(payload.start_date_object).format(DATE_FORMAT);
    payload.end_date = moment(payload.end_date_object).format(DATE_FORMAT);
    delete payload.start_date_object;
    delete payload.end_date_object;

    tripService
      .createTrip(payload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(Actions.GET_TRIP_LIST, null, { root: true });
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  createTripDay(context: any, payload: TripDay) {
    context.commit('isLoading', true);
    payload.trip_date = moment(payload.trip_date_object).format(DATE_FORMAT);
    delete payload.trip_date_object;

    tripService
      .createTripDay(payload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(
            Actions.GET_TRIP_DETAIL,
            { tripId: payload.trip_id, isCreateOrUpdate: true },
            { root: true }
          );
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  createTripEvent(context: any, payload: Event) {
    context.commit('isLoading', true);
    const newPayload = _createEventRequestPayload(payload);

    if (newPayload.start_time_object) {
      newPayload.start_time = moment(newPayload.start_time_object).format(DATE_TIME_FORMAT);
      if (!newPayload.start_time_timezone_id) {
        newPayload.start_time_timezone_id = context.state.tripDetail.timezone_id;
      }
    }

    if (newPayload.end_time_object) {
      newPayload.end_time = moment(newPayload.end_time_object).format(DATE_TIME_FORMAT);
      if (!newPayload.end_time_timezone_id) {
        newPayload.start_time_timezone_id = context.state.tripDetail.timezone_id;
      }
    }

    eventService
      .createTripEvent(newPayload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(
            Actions.GET_TRIP_DETAIL,
            { tripId: context.state.tripDetail.id, isCreateOrUpdate: true },
            { root: true }
          );
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  updateTrip(context: any, payload: Trip) {
    context.commit('isLoading', true);
    payload.start_date = moment(payload.start_date_object).format(DATE_FORMAT);
    payload.end_date = moment(payload.end_date_object).format(DATE_FORMAT);
    delete payload.start_date_object;
    delete payload.end_date_object;

    tripService
      .updateTrip(payload)
      .then((result: any) => {
        if (result.success) {
          context.commit('isLoading', false);
          context.commit('updateTrip', payload);
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  // TODO - A new action for updating trip day action

  updateTripEvent(context: any, payload: Event) {
    context.commit('isLoading', true);
    const newPayload = _createEventRequestPayload(payload);
    if (newPayload.start_time) {
      newPayload.start_time = moment(newPayload.start_time).format(DATE_TIME_FORMAT);
    }
    if (newPayload.end_time) {
      newPayload.end_time = moment(newPayload.end_time).format(DATE_TIME_FORMAT);
    }
    eventService
      .updateTripEvent(newPayload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(
            Actions.GET_TRIP_DETAIL,
            { tripId: context.state.tripDetail.id, isCreateOrUpdate: true },
            { root: true }
          );
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
};

const mutations: MutationTree<TripState> = {
  isLoading(state: TripState, payload: boolean) {
    state.isLoading = payload;
  },
  getTripList(state: TripState, payload: Trip[]) {
    map(payload, (trip: Trip) => {
      trip.start_date = moment(trip.start_date).format(DATE_FORMAT);
      trip.end_date = moment(trip.end_date).format(DATE_FORMAT);
      return trip;
    });
    state.tripList = payload;
  },
  getTripDetail(state: TripState, payload: Trip) {
    if (payload) {
      payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
      if (!isEmpty(payload.trip_day)) {
        map(payload.trip_day, (tripDay: TripDay) => {
          tripDay.trip_date = moment(tripDay.trip_date).format(DATE_FORMAT);
          map(tripDay.events, (tripEvent: Event) => {
            if (!isEmpty(tripEvent.start_time)) {
              const startTimeTimezoneId = tripEvent.start_time_timezone_id || payload.timezone_id;
              const startTimeTimezone = timezone.find(tz => tz.id === startTimeTimezoneId);
              tripEvent.start_time = moment
                .utc(tripEvent.start_time)
                .tz(startTimeTimezone.utc)
                .format(DATE_TIME_TZ_FORMAT);
            }
            if (!isEmpty(tripEvent.end_time)) {
              const endTimeTimezoneId = tripEvent.end_time_timezone_id || payload.timezone_id;
              const endTimeTimezone = timezone.find(tz => tz.id === endTimeTimezoneId);
              tripEvent.end_time = moment
                .utc(tripEvent.end_time)
                .tz(endTimeTimezone.utc)
                .format(DATE_TIME_TZ_FORMAT);
            }
            return tripEvent;
          });
          return tripDay;
        });
      }
      payload.archived = payload.archived === 1;
    }
    state.tripDetail = payload;
  },
  updateTrip(state: TripState, payload: Trip) {
    Object.keys(payload).forEach(prop => {
      state.tripDetail[prop] = payload[prop];
    });
  },
};

export const trip: Module<TripState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
